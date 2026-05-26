import mongoose, { Schema } from "mongoose";

const ROLES = Object.freeze({
    ADMIN: 'admin',
    USER: 'user',
});

const userSchema = new Schema({
    name: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true, minlength: 5 },
    role: {
        type: String,
        enum: {
            values: Object.values(ROLES),
            message: '{VALUE} is not a supported role'
        },
        default: ROLES.USER,
        lowercase: true,
        trim: true
    }
}, {
    timestamps: true
})

export const User = mongoose.model('User', userSchema)
