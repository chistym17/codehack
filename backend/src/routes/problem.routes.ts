import { Router } from 'express';
import { createProblem, getAllProblems, getProblemBySlug } from '../controllers/problem.controller';

const router = Router();

router.post('/', createProblem);
router.get('/', getAllProblems);
router.get('/:slug', getProblemBySlug);

export default router;
