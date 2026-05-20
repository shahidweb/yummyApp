import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
    try {
        if (!process.env.MONGO_URL) {
            throw new Error("Mongo_URL is missing")
        }
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDb connected: ${conn.connection.host}`)
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Database connection error: ${error.message}`)
        }
        process.exit(1)
    }
}

export default connectDB;