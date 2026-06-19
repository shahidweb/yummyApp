import type { Request, Response } from "express";
import { MyOrder } from "../model/myOrder.ts";
import { Product } from "../model/product.ts";


export const createOrder = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;
        const { items } = req.body;
        const { deliveryAddress } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Order items are required" });
        }

        let totalPrice = 0;
        const orderItems = [];

        for (const item of items) {
            const product = await Product.findById(item.productId);

            if (!product) {
                return res.status(404).json({ message: `Product not found: ${item.productId}` });
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
            status: "Pending",
            items: orderItems,
            total_price: totalPrice,
            currency: "USD",
            orderedBy: user.id,
            deliveryAddress,
        });

        return res.status(201).json({
            success: true,
            message: "Order created successfully",
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

export const getMyOrder = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        if (!userId) {
            return res.status(401).json({ message: "Authentication token missing" })
        }

        const orders = await MyOrder.find({ orderedBy: userId })
        if (!orders) {
            return res.status(401).json({ message: "Not found order" })
        }

        return res.status(200).json({ message: "Orders History", orders });

    } catch (error: any) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}