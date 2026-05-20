import type { Request, Response } from "express";
import { Product } from "../model/product.ts";

export const getProducts = async (req: Request, res: Response) => {
    try {
        const allProducts = await Product.find();
        return res.status(200).json(allProducts)
    } catch (error: any) {
        return res.status(500).json({
            message: "Internal server error",
            error
        })
    }
}

export const createProduct = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        if (!userId) {
            return res.status(401).json({ message: "Authentication token missing" })
        }
        const { name, description, price, category } = req.body;
        await Product.create({
            name, description, price, category, createdBy: userId
        })
        return res.status(201).json({ message: "Product created successfully!" })
    } catch (error: any) {
        return res.status(500).json({
            message: "Internal server error",
            error
        })
    }
}