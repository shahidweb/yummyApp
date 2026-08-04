import type { Request, Response } from "express";
import { MyOrder } from "../model/myOrder.ts";
import { Product } from "../model/product.ts";
import { fail, success } from "../utils/apiResponse.ts";


export const createOrder = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;
        const { items } = req.body;
        const { deliveryAddress } = req.body;

        if (!items || items.length === 0) {
            return fail(res, `Order items are required`, 400);
        }

        let totalPrice = 0;
        const orderItems = [];

        for (const item of items) {
            const product = await Product.findById(item.productId);

            if (!product) {
                return fail(res, `Product not found: ${item.productId}`, 404);
            }

            totalPrice += (product.price * item.quantity);
            orderItems.push({
                product_id: product._id,
                name: product.name,
                quantity: item.quantity,
                price: product.price,
            });
        }

        await MyOrder.create({
            items: orderItems,
            total_price: totalPrice,
            currency: "USD",
            orderedBy: user.id,
            deliveryAddress,
        });
        return success(res, "Order created successfully", null, 201)
    } catch (error: any) {
        return fail(res, (error.message || "Internal server error"));
    }
};

export const getMyOrder = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        if (!userId) {
            return fail(res, "Authentication token missing", 401);
        }

        const orders = await MyOrder.find({ orderedBy: userId })
        return success(res, "Orders History", orders)

    } catch (error: any) {
        return fail(res, (error.message || "Internal server error"));
    }
}


//#Admin Controller
export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        if (!userId) {
            return fail(res, "Authentication token missing", 401);
        }
        const allOrders = await MyOrder.find().select('-__v').lean();
        return success(res, 'All users Orders', allOrders)

    } catch (error: any) {
        return fail(res, (error.message || "Internal server error"));
    }
}

//#Admin Controller
export const orderStatus = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        if (!userId) {
            return fail(res, "Authentication token missing", 401);
        }
        const { id } = req.params;
        const { status } = req.body;

        const order = await MyOrder.findByIdAndUpdate(id, { status }, { returnDocument: "after", runValidators: true });
        if (!order) {
            return fail(res, "Order not found", 404);
        }
        const allOrders = await MyOrder.find().select('-__v').lean();
        return success(res, 'All users Orders', allOrders)

    } catch (error: any) {
        return fail(res, (error.message || "Internal server error"));
    }
}