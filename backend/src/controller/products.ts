import type { Request, Response } from "express";
import mongoose from "mongoose";
import { Product } from "../model/product.ts";
import { fail, success } from "../utils/apiResponse.ts";

export const getProducts = async (req: Request, res: Response) => {
    try {
        const allProducts = await Product.find().select('-__v').lean();
        return success(res, "All Product List", allProducts)
    } catch (error: any) {
        return fail(res, (error.message || "Internal server error"));
    }
}

export const createProduct = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        if (!userId) {
            return fail(res, "Authentication token missing", 401);
        }
        const { name, description, price, category, image } = req.body;
        const product = await Product.create({
            name, description, price, category, image, createdBy: userId
        })
        const newProduct = { _id: product._id, ...req.body }
        return success(res, "Product created successfully!", newProduct)
    } catch (error: any) {
        return fail(res, (error.message || "Internal server error"));
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as any;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return fail(res, "Invalid product id", 400);
        }
        const { name, description, price, category } = req.body;

        const updateData: any = {};

        if (name !== undefined) updateData.name = name;
        if (description !== undefined) updateData.description = description;
        if (price !== undefined) updateData.price = price;
        if (category !== undefined) updateData.category = category;

        const product = await Product.findByIdAndUpdate(id, updateData, { returnDocument: "after" });
        if (!product) return fail(res, "Product not found", 400);

        const updatedProduct = { _id: product._id, name, description, price, category }
        return success(res, "Product updated successfully!", updatedProduct)

    } catch (error: any) {
        return fail(res, (error.message || "Internal server error"));
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as any;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return fail(res, "Invalid product id", 400);
        }

        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return fail(res, "Product not found", 400);
        }
        return success(res, "Product deleted successfully!")

    } catch (error: any) {
        return fail(res, (error.message || "Internal server error"));
    }
}