import bcrypt from 'bcryptjs';
import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../model/user.ts';
import { fail, success } from '../utils/apiResponse.ts';
import { MESSAGE } from '../utils/messages.ts';

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return fail(res, "User already registered", 409);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hashedPassword });
        return success(res, "Registered Succeed", null, 201)

    } catch (error: any) {
        return fail(res, (error.message || "Internal server error"));
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return fail(res, "All fields are required", 400);

        const existingUser = await User.findOne({ email });
        if (!existingUser) return fail(res, MESSAGE.INVALID, 401);

        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if (!matchPassword) return fail(res, MESSAGE.INVALID, 401);

        if (!process.env.SECRET_KEY) {
            throw new Error("SECRET_KEY missing");
        }
        const token = jwt.sign({ id: existingUser._id, email: existingUser.email }, process.env.SECRET_KEY, { expiresIn: '1h' })

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,        // MUST be false on localhost (true requires HTTPS)
            sameSite: 'lax',      // Allows cross-origin requests from 5173 to 5000
            maxAge: 24 * 60 * 60 * 1000 // 1 day expiration
        });
        return success(res, MESSAGE.SUCCESS)
    } catch (error: any) {
        return fail(res, (error.message || MESSAGE.DEFAULT_ERROR));
    }
}

export const me = async (req: Request, res: Response) => {
    try {
        const { id } = (req as any).user;
        const users = await User.find({ _id: id }).select('_id name email role');
        if (!users) {
            res.clearCookie('token');
            return fail(res, "Authentication token missing", 500);
        }
        return success(res, "", users[0])
    } catch (error: any) {
        return fail(res, (error.message || MESSAGE.DEFAULT_ERROR));
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "strict"
        });
        return success(res, MESSAGE.LOGOUT)
    } catch (error: any) {
        return fail(res, (error.message || MESSAGE.DEFAULT_ERROR));
    }
}