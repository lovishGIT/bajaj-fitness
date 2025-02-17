import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
    constructor(public statusCode: number, public message: string) {
        super(message);
        this.name = 'AppError';
    }
}

export const errorHandler = (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message,
        });
    }

    console.error(err);
    return res.status(500).json({
        message: 'Internal server error',
    });
};
