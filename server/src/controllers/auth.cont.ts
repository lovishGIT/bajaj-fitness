import { Request, Response } from 'express';
import { User } from '@/models/user.model.js';
import { AuthRequest } from '@/types/user.interfaces.js';
import { CookiePayload, generateToken } from '@/utils/tokens.utils.js';
import env from '@/config/validateEnv.config.js';

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
            _id: user._id,
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
            _id: user._id,
            email: user.email,
        });

        return res
            .status(200)
            .cookie('token', token, {
                httpOnly: true,
                secure: env.NODE_ENV === 'production',
                sameSite: 'none',
            })
            .json({ token });
    } catch (error) {
        return res.status(401).json({
            message: (error as Error).message,
        });
    }
};

export const logoutController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        res.clearCookie('token');
        return res.json({ message: "Logged out successfully" });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

export const refreshTokenController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        if (!req.user) {
            throw new Error('Invalid credentials');
        }
        const newToken = generateToken(req.user as CookiePayload);

        return res
            .status(200)
            .cookie('token', newToken, {
                httpOnly: true,
                secure: env.NODE_ENV === 'production',
                sameSite: 'none',
            })
            .json({ token: newToken });

    } catch (error) {
        return res.status(401).json({
            message: (error as Error).message,
        });
    }
};

export const verifyController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        return res.status(200).json({ message: "Authenticated" });
    } catch (error) {
        return res.status(401).json({
            message: "Please authenticate",
        });
    }
};