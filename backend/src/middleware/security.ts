import { Request, Response, NextFunction } from 'express';

// Input validation for submissions
export const validateSubmission = (req: Request, res: Response, next: NextFunction): void => {
    const { language } = req.body;



    const validLanguages = ['cpp', 'python', 'c'];
    if (!language || !validLanguages.includes(language)) {
        res.status(400).json({
            success: false,
            message: 'Invalid programming language'
        });
        return;
    }


    next();
};

// SQL injection prevention
export const preventSqlInjection = (req: Request, res: Response, next: NextFunction): void => {
    const { code } = req.body;

    if (code && (
        code.includes('--') ||
        code.includes(';') ||
        code.includes('DROP') ||
        code.includes('ALTER') ||
        code.includes('TRUNCATE')
    )) {
        res.status(400).json({
            success: false,
            message: 'Invalid code. SQL injection attempt detected'
        });
        return;
    }

    next();
};
