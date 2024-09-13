import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Importing cors
import patientRoutes from './src/routes/patientRoutes.js';
import appointmentRoutes from './src/routes/appointmentRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
    origin: '*', // Or specify your frontend's origin if needed
    methods: ['GET', 'POST', 'PUT', 'DELETE'] // Ensure POST is allowed
  }));

app.use('/v1', patientRoutes);
app.use('/v1', appointmentRoutes);
app.get('/test', (req, res) => {
    res.json({ message: 'Test route is working' });
  });
  
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 7001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
