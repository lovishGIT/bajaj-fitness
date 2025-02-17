import { Request, Response } from 'express';
import { User } from '@/models/user.model.js';
import { AuthRequest } from '@/types/user.interfaces.js';
import { generateToken } from '@/utils/tokens.utils.js';

export const registerController = async (
    req: Request<{}, {}, AuthRequest>,
    res: Response
): Promise<Response> => {
    try {
        const { email, password, isGuest, googleId, name } = req.body;

        const user = await User.create({
            email,
            password,
            isGuest,
            googleId,
            name,
        });

        const token = generateToken({
            userId: user._id,
            email: user.email,
        });

        return res.status(201).json({ token });
    } catch (error) {
        console.warn((error as Error).message || error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

export const loginController = async (
    req: Request<{}, {}, AuthRequest>,
    res: Response
): Promise<Response> => {
    try {
        const { email, password } = req.body;
        const user = await User.findByEmail(email);

        if (
            !user ||
            !password ||
            !(await user.comparePassword(password))
        ) {
            throw new Error('Invalid credentials');
        }

        const token = generateToken({
            userId: user._id,
            email: user.email,
        });

        return res.json({ token });
    } catch (error) {
        return res.status(401).json({
            message: (error as Error).message,
        });
    }
};
