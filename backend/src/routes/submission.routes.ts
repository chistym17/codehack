import { Router } from 'express';
import { createSubmission, getUserSubmissions } from '../controllers/submission.controller';

const router = Router();

router.post('/', createSubmission);
router.get('/user/:userId', getUserSubmissions);

export default router;
