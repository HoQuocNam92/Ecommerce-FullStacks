import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: 3,
  retryStrategy(times) {
    return Math.min(times * 50, 2000);
  },
});
redis.on('error', (err) => console.error('Redis connection error:', err));
redis.on('connect', () => console.log('Redis connected successfully'));

const CACHE_TIMEOUTS = {
  PRODUCTS: 300,
  CATEGORIES: 600,
  ORDERS: 60,
  USERS: 300,
  ANALYTICS: 180,
  SEARCH: 120,
  CART: 1800,
  WISHLIST: 1800,
  REVIEWS: 600,
  PAYMENTS: 30
};

// 🔹 Get
export const getCache = async (key) => {
  try {
    const value = await redis.get(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    return null;
  }
};

// 🔹 Set
export const setCache = async (key, value, ttl = null) => {
  try {
    const serializedValue = JSON.stringify(value);
    if (ttl) await redis.setex(key, ttl, serializedValue);
    else await redis.set(key, serializedValue);
    return true;
  } catch (error) {
    return false;
  }
};

// 🔹 Delete
export const deleteCache = async (key) => {
  try {
    await redis.del(key);
    return true;
  } catch (error) {
    return false;
  }
};

// 🔹 Exists
export const existsCache = async (key) => {
  try {
    const result = await redis.exists(key);
    return result === 1;
  } catch (error) {
    return false;
  }
};

// 🔹 Expire
export const expireCache = async (key, ttl) => {
  try {
    await redis.expire(key, ttl);
    return true;
  } catch (error) {
    return false;
  }
};

// 🔹 Cache data (với TTL tự động)
export const cacheData = async (type, key, data, customTtl = null) => {
  const ttl = customTtl || CACHE_TIMEOUTS[type] || 300;
  return await setCache(key, data, ttl);
};

// 🔹 Get data với fallback
export const getCachedData = async (type, key, fallbackFunction, customTtl = null) => {
  try {
    const cachedData = await getCache(key);
    if (cachedData) {
      return cachedData;
    }

    const freshData = await fallbackFunction();

    await cacheData(type, key, freshData, customTtl);
    return freshData;
  } catch (error) {
    try {
      return await fallbackFunction();
    } catch (fallbackError) {
      throw error;
    }
  }
};

// 🔹 Invalidate pattern
export const invalidatePattern = async (pattern) => {
  try {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
    return keys.length;
  } catch (error) {
    return 0;
  }
};

// 🔹 Invalidate entity
export const invalidateEntity = async (entityType, entityId = null) => {
  const patterns = {
    PRODUCTS: ['products:*', 'categories:*', 'search:*'],
    CATEGORIES: ['categories:*', 'products:*'],
    ORDERS: ['orders:*', 'analytics:*'],
    USERS: ['users:*', 'analytics:*'],
    ANALYTICS: ['analytics:*', 'dashboard:*']
  };

  const patternsToInvalidate = patterns[entityType] || [`${entityType.toLowerCase()}:*`];
  let totalInvalidated = 0;

  for (const pattern of patternsToInvalidate) {
    const invalidated = await invalidatePattern(pattern);
    totalInvalidated += invalidated;
  }

  return totalInvalidated;
};

// 🔹 Lock system (dùng cho đồng bộ dữ liệu)
export const acquireLock = async (lockKey, ttl = 10) => {
  try {
    const lockValue = Date.now().toString();
    const result = await redis.set(lockKey, lockValue, 'EX', ttl, 'NX');
    return result === 'OK';
  } catch (error) {
    return false;
  }
};

export const releaseLock = async (lockKey) => {
  try {
    await redis.del(lockKey);
    return true;
  } catch (error) {
    return false;
  }
};

// 🔹 Cache warming
export const warmCache = async (type, key, dataFunction) => {
  const lockKey = `lock:${key}`;
  try {
    const lockAcquired = await acquireLock(lockKey, 30);
    if (!lockAcquired) {
      return false;
    }

    const data = await dataFunction();
    await cacheData(type, key, data);

    return true;
  } catch (error) {
    return false;
  } finally {
    await releaseLock(lockKey);
  }
};

// 🔹 Cache statistics
export const getCacheStats = async () => {
  try {
    const info = await redis.info('memory');
    const keyspace = await redis.info('keyspace');
    return {
      memory: info,
      keyspace: keyspace,
      connected: redis.status === 'ready'
    };
  } catch (error) {
    return null;
  }
};

export const healthCheck = async () => {
  try {
    await redis.ping();
    return { status: 'healthy', timestamp: new Date().toISOString() };
  } catch (error) {
    return { status: 'unhealthy', error: error.message, timestamp: new Date().toISOString() };
  }
};

export const closeCacheConnection = async () => {
  try {
    await redis.quit();
  } catch (error) {
    console.error('Redis close error:', error);
  }
};
