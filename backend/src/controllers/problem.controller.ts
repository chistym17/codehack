import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createProblem = async (req: Request, res: Response) => {
  try {
    const { description, difficulty, slug } = req.body;

    const existingProblem = await prisma.problem.findUnique({
      where: { slug }
    });

    if (existingProblem) {
      return res.status(400).json({ error: 'Problem with this slug already exists' });
    }

    const problem = await prisma.problem.create({
      data: {
        description,
        difficulty,
        slug
      }
    });

    return res.status(201).json(problem);
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export const getAllProblems = async (res: Response) => {
  try {
    const problems = await prisma.problem.findMany();
    return res.json(problems);
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export const getProblemBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const problem = await prisma.problem.findUnique({
      where: { slug }
    });

    if (!problem) {
      return res.status(404).json({ error: 'Problem not found' });
    }

    return res.json(problem);
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
