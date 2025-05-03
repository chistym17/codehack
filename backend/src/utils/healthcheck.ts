import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const checkHealth = async (res: Response) => {
  try {
    const problems = await prisma.problem.findMany({
      take: 1
    });

    return res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
      environment: process.env.NODE_ENV || 'development',
      data: problems
    });
  } catch (error) {
    console.error('Health check failed:', error);
    return res.status(503).json({
      status: 'unhealthy',
      error: 'Database connection failed'
    });
  }
};

export const checkServerStatus = (res: Response) => {
  return res.status(200).json({
    status: 'running',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
};
