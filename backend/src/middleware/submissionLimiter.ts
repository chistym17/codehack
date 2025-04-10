import rateLimit from 'express-rate-limit';

export const submissionLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: 'Too many submissions. Please wait a minute before trying again.',
    standardHeaders: true,
    legacyHeaders: false
});

export const hourlyLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 20,
    message: 'Too many submissions. Please wait an hour before trying again.',
    standardHeaders: true,
    legacyHeaders: false
});
