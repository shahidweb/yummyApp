import type { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";


function tokenValidate(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Authentication token missing" })
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY!);
        (req as any).user = decoded;
        next();

    } catch (error) {
        res.clearCookie('token');
        return res.status(401).json({
            message: "Invalid or expired token"
        });

    }
}

export default tokenValidate;