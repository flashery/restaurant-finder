import { Router } from 'express';
import { parseAndSearch } from '../controllers/query.controller';

const router = Router();

router.post('/execute', parseAndSearch);

export default router;
