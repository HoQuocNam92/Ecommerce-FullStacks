import sql from 'mssql';
import 'dotenv/config';
import logger from '#src/shared/utils/logger.js';
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST,
    database: process.env.DB_NAME,
    options: {
        encrypt: true,
        trustServerCertificate: true,
        enableArithAbort: true
    },
    requestTimeout: 50000
}

let pool;

const db = async () => {
    try {
        if (!pool) {
            pool = await new sql.ConnectionPool(config).connect();
            sql.on('error', err => {
                console.error('SQL error:', err);
            })
            logger.info("Connected to the database successfully")
        }
        return pool;
    } catch (error) {
        logger.error(`Database connection failed: ${error}`)
        throw error;
    }
};
export default db;