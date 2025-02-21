import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { checkConnection } from './config/db';

//auth
import authRoutes from './routes/auth.routes';
import batchRoutes from './routes/batch.routes';

dotenv.config();

const app = express();
const PORT = 5000;
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());


app.use('/api/auth', authRoutes);
app.use('/api/batch', batchRoutes);


checkConnection().then(() => {
app.listen(PORT, () => { 
    console.log(`Servidor Corriendo ${PORT}`);
    });
});
