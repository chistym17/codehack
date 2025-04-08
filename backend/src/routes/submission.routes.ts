import { Router } from 'express';
import { createSubmission, getUserSubmissions, getSubmissionById, submitCode } from '../controllers/submission.controller';

const router = Router();

router.post('/', createSubmission);
router.get('/user/:userId', getUserSubmissions);
router.post('/submit', submitCode);
router.get('/:userId/:problemId', getSubmissionById);

export default router;
