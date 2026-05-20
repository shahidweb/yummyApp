import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true, minlength: 5 },
}, {
    timestamps: true
})

export const User = mongoose.model('User', userSchema)
