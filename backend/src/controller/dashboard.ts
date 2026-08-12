import type { Request, Response } from "express";
import { Product } from "../model/product.ts";
import { fail, success } from "../utils/apiResponse.ts";
import { MyOrder } from "../model/myOrder.ts";
import { User } from "../model/user.ts";



export const getDashboardSummary = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        if (!userId) {
            return fail(res, "Authentication token missing", 401);
        }

        const [products, orders, customers] =
            await Promise.all([
                Product.countDocuments(), MyOrder.countDocuments(), User.countDocuments()
            ]);

        const revenueResult = await MyOrder.aggregate([
            {
                $match: {
                    status: 4
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$total_price" }
                }
            }
        ]);

        const revenue = revenueResult[0]?.total || 0;

        return success(res, "Dashboard summary", {
            products,
            orders,
            revenue,
            customers
        });

    } catch (error: any) {
        return fail(res, (error.message || "Internal server error"));
    }
}