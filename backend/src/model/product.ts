import mongoose, { Schema } from "mongoose";
const CATEGORIES = ['Salad', "Rolls", "Deserts", "Sandwich", "Cake", "Pure Veg", "Pasta", "Noodles"]

const productSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    category: { type: String, required: true, enum: CATEGORIES, default: "Salad" },
    image: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true }
)

export const Product = mongoose.model("Product", productSchema)