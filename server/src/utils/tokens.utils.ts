import jwt from 'jsonwebtoken';
import env from '@/config/validateEnv.config.js';
import ms from "ms";

interface Payload {
    userId: string;
    email: string;
}

export const generateToken = (payload: Payload): string => {
    return jwt.sign(payload, env.JWT_SECRET, {
        expiresIn: env.tokenExpiration as (number | ms.StringValue | undefined),
    });
};

export const checkToken = (token: string): Payload => {
    return jwt.verify(token, env.JWT_SECRET) as Payload;
};