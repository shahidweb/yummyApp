import type { Request, Response } from 'express';
import { User } from '../model/user.ts';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'


export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).send('User already registered')
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hashedPassword });

        res.status(201).send('Registerd Successed')

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).send({
                message: "All fields are required"
            })

        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(401).send('Invalid credential');

        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if (!matchPassword) return res.status(400).send('Invalid credential');

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
        return res.status(200).json({ message: "login successfully" })

    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
}

export const me = async (req: Request, res: Response) => {
    try {
        const { id } = (req as any).user;
        const users = await User.find({ _id: id }).select('_id name email role');
        if (!users) {
            res.clearCookie('token');
            return res.status(500).json({
                success: false,
            })
        }
        return res.status(200).json({
            success: true,
            users
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
}