import express from 'express';
import cors from 'cors';
import registerRoutes from './routes/registerRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', registerRoutes);

export default app;