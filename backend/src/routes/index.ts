import { Router } from 'express';
import restaurantRouter from './restaurant.routes';

const router = Router();

router.use('/restaurants', restaurantRouter);

export default router;
