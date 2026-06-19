import 'dotenv/config';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import express from 'express';
import connectDB from './db/config.ts';
import userRoutes from './routes/user.ts';
import productRoutes from './routes/product.ts'
import OrderRoutes from './routes/orders.ts'


const app = express();
const PORT = process.env.PORT;

const allowedOrigins = [
    "http://localhost:4200",
    "http://localhost:5173",
];

app.use(cookieParser())
app.use(
    cors({
        origin(origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);
app.use(express.json());
connectDB();

app.get('/', (req, res) => {
    res.send('Welcome to home route')
})

app.use('/api/v1', userRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/order', OrderRoutes);

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`)
})