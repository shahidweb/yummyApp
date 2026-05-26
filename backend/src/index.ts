import 'dotenv/config';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import express from 'express';
import connectDB from './db/config.ts';
import userRoutes from './routes/user.ts';
import productRoutes from './routes/product.ts'


const app = express();
const PORT = process.env.PORT

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Explicitly mirror your frontend origin
    credentials: true                // Allow cookies/headers to accompany the request
}));
app.use(cookieParser())
connectDB();

app.get('/', (req, res) => {
    res.send('Welcome to home route')
})

app.use('/api/v1', userRoutes);
app.use('/api/v1/product', productRoutes);

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`)
})