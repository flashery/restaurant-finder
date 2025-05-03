import { Router } from 'express';
import { findRestaurants } from '../controllers/restaurant.controller';

const router = Router();

router.get('/search', findRestaurants);

export default router;
