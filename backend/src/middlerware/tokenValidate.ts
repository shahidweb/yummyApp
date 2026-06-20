import type { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { fail } from "../utils/apiResponse.ts";


function tokenValidate(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return fail(res, "Authentication token missing", 401)
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY!);
        (req as any).user = decoded;
        next();

    } catch (error) {
        res.clearCookie('token');
        return fail(res, "Invalid or expired token", 401)
    }
}

export default tokenValidate;