import { Router } from 'express';
import queryRouter from './query.routes';

const router = Router();

router.use('/', queryRouter); 

export default router;
