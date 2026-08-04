import mongoose, { Schema } from "mongoose";

const orderItemSchema = new Schema(
    {
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true },
    },
    { _id: false }
);

const addressSchema = new Schema(
    {
        fullName: { type: String, required: true },
        phone: { type: String, required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        zipCode: { type: String, required: true },
    },
    { _id: false }
);

const myOrderSchema = new Schema(
    {
        status: {
            type: Number, required: true,
            enum: [1, 2, 3, 4, 5],
            default: 1,
        },
        items: { type: [orderItemSchema], required: true },
        deliveryAddress: { type: addressSchema, required: true },
        total_price: { type: Number, required: true, min: 0 },
        currency: { type: String, required: true, default: "USD", },
        orderedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, },
    },
    {
        timestamps: true,
    }
);

export const MyOrder = mongoose.model("MyOrder", myOrderSchema);