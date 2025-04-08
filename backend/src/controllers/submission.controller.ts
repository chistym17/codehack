import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { submitSolution } from '../services/judge.service';

const prisma = new PrismaClient();

export const createSubmission = async (req: Request, res: Response) => {
  try {
    const { code, userId, problemId } = req.body;

    const submission = await prisma.submission.create({
      data: {
        code,
        userId,
        problemId
      }
    });

    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const getUserSubmissions = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const submissions = await prisma.submission.findMany({
      where: { userId: parseInt(userId) },
      include: {
        User: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const submitCode = async (req: Request, res: Response) => {
  const { fullCode, language, problem } = req.body;

  if (!fullCode || !language || !problem) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await submitSolution(fullCode, language, problem);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error during submission:', error instanceof Error ? error.message : error);
    return res.status(500).json({ error: 'Failed to submit code' });
  }
};
