// /src/config/db.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Asynchronous function to connect to MongoDB
const connectDB = async (): Promise<void> => {
    try {
        // Connect to MongoDB using the connection URI
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined in the environment variables.');
        }

        await mongoose.connect(process.env.MONGO_URI as string);

        console.log('MongoDB connected successfully');
    } catch (err: any) {
        console.error('MongoDB connection failed:', err.message);
        process.exit(1); // Exit the process with a failure code
    }
};

// Export the connectDB function
export default connectDB;

