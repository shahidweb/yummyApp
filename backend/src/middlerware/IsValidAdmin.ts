import type { NextFunction, Request, Response } from "express";
import { ROLES, User } from "../model/user.ts";
import { fail } from "../utils/apiResponse.ts";

async function isAdmin(req: Request, res: Response, next: NextFunction) {
    const { id } = (req as any).user;
    if (!id) {
        return fail(res, "Authentication token missing", 401);
    }
    const user = await User.findById(id).select('role');
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    if (user.role !== ROLES.ADMIN) {
        return fail(res, "Access denied. Admin only.", 403);
    }
    next();
}

export default isAdmin;