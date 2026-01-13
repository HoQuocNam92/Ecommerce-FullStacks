import express from 'express';
import * as SearchController from './search.controllers.js';
// import { authenticateToken } from '../../shared/middlewares/auth.middleware.js';

const router = express.Router();

router.get('/products', SearchController.searchProducts);
router.get('/suggestions', SearchController.getSearchSuggestions);
router.get('/popular', SearchController.getPopularSearches);


router.get('/recent', SearchController.getRecentSearches);
router.post('/history', SearchController.saveSearchHistory);

export default router;