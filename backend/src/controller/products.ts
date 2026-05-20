import type { Request, Response } from "express";
import { Product } from "../model/product.ts";
import mongoose from "mongoose";

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

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as any;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid product id" })
        }
        const { name, description, price, category } = req.body;

        const updateData: any = {};
        if (name !== undefined) updateData.name = name;
        if (description !== undefined) updateData.description = description;
        if (price !== undefined) updateData.price = price;
        if (category !== undefined) updateData.category = category;
        console.log(updateData)
        const product = await Product.findByIdAndUpdate(id,
            updateData,
            { returnDocument: "after" }
        );
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }
        return res.status(200).json({ message: "Product updated successfully!", product })

    } catch (error: any) {
        return res.status(500).json({
            message: "Internal server error",
            error
        })
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as any;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid product id" })
        }

        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: "Prodcut not found" })
        }
        return res.status(200).json({ message: "Product deleted successfully!" })

    } catch (error: any) {
        return res.status(500).json({
            message: "Internal server error",
            error
        })
    }
}