import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js'; // Ensure this path is correct
import businessRoutes from './routes/businessRoutes.js'; // Ensure this path is correct
import authRoutes from './routes/authRoutes.js';
import superAdminRoutes from './routes/superAdminRoutes.js';
import subUserRoutes from './routes/subUserRoutes.js'; // Ensure this path is correct
import buyerRoutes from './routes/buyerRoutes.js'; // Import Buyer Routes

dotenv.config();
connectDB();

const app = express();

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/businesses', businessRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/super-admin', superAdminRoutes);
app.use('/api/sub-users', subUserRoutes);
app.use('/api/buyers', buyerRoutes); // Use Buyer Routes

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
