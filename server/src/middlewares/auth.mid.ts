import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import env from '@/config/validateEnv.config.js';

interface JWTPayload {
    userId: string;
    email?: string;
}

export const auth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req?.header('Authorization')?.replace('Bearer ', '') || req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Please authenticate" });
        }

        const decoded = jwt.verify( token, env.JWT_SECRET
        ) as JWTPayload;

        req.user = {
            _id: decoded?.userId,
            email: decoded?.email,
        };
        next();
    } catch (error) {
        res.status(401).json({ message: 'Please authenticate' });
    }
};
