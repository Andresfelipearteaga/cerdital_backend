import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { checkConnection } from './config/db';


import authRoutes from './routes/auth.routes';
import batchRoutes from './routes/batch.routes';
import feedingRoutes from './routes/feeding.routes';
import healthRoutes from './routes/health.routes';
import financeRoutes from './routes/finance.routes'
import progressRoutes from './routes/progress.routes'

dotenv.config();

const app = express();
const PORT = 5000;
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());


app.use('/api/auth', authRoutes);
app.use('/api/batch', batchRoutes);
app.use('/api/feeding', feedingRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/finance', financeRoutes)
app.use('/api/progress', progressRoutes)


checkConnection().then(() => {
app.listen(PORT, () => { 
    console.log(`Servidor Corriendo ${PORT}`);
    });
});
