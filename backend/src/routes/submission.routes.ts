import { Router } from 'express';
import { createSubmission, getUserSubmissions, getSubmissionById, submitCode } from '../controllers/submission.controller';
import { submissionLimiter, hourlyLimiter } from '../middleware/submissionLimiter';
import { incrementApiUsage } from '../services/apiUsage';

const router = Router();

router.post('/', createSubmission);
router.get('/user/:userId', getUserSubmissions);
router.get('/:userId/:problemId', getSubmissionById);

router.post('/submit', submissionLimiter, hourlyLimiter, async (req, res) => {
    try {

        incrementApiUsage();
        await submitCode(req, res);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to submit code',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

export default router;
