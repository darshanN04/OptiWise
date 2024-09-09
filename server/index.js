import express from 'express';
import dotenv from 'dotenv';
import patientRoutes from './src/routes/patientRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

// Patient Routes
app.use('/v1', patientRoutes);




const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
