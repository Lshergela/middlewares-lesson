import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';

const app = express();

const PORT = 3000;
const MONGO_URL =
  'mongodb+srv://lukashergelashvili2021:MongoCalendar@cluster0.fcidp.mongodb.net/mziuri?retryWrites=true&w=majority&appName=Cluster0';

app.use(express.json());
app.use(cors());

app.use('/users', userRoutes);
app.use('/products', productRoutes);

app.listen(PORT, () => {
  console.log(`listening to ${PORT}`);
  mongoose
    .connect(MONGO_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));
});
