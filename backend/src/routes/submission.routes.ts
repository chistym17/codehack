import { Router } from 'express';
import { createSubmission, getUserSubmissions, submitCode } from '../controllers/submission.controller';

const router = Router();

router.post('/', createSubmission);
router.get('/user/:userId', getUserSubmissions);
router.post('/submit', submitCode);

export default router;
