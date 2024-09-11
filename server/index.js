import express from 'express';
import dotenv from 'dotenv';
import patientRoutes from './src/routes/patientRoutes.js';
import appointmentRoutes from './src/routes/appointmentRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

// Patient Routes
app.use('/v1', patientRoutes);
app.use('/v1', appointmentRoutes); 




const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
