// /src/config/db.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const connectDB = async (): Promise<void> => {
    try {
        const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_URI } = process.env;

        if (!MONGO_PASSWORD || !MONGO_URI) {
            throw new Error('MONGO_PASSWORD, or MONGO_URI is not defined in the environment variables.');
        }

        // Encode the password if not already encoded
        const encodedPassword = encodeURIComponent(MONGO_PASSWORD).replace("*", '%2A');
        // console.log(`${MONGO_PASSWORD} : ${encodedPassword}`);

        // Replace placeholders in the URI
        const connectionURI = MONGO_URI.replace("<db_password>", encodedPassword);
        // console.log(`${connectionURI}`);

        // Connect to MongoDB
        await mongoose.connect(connectionURI);

        console.log(`MongoDB connected successfully at ${connectionURI}`);
    } catch (err: any) {
        console.error(`MongoDB connection failed:`, err.message);
        process.exit(1); // Exit the process with a failure code
    }
};

export default connectDB;


// Special Characters in Connection String Password
// If your password includes special characters, and you are using your password in a connection string URI, encode the special characters.

// If you try to update a password with a special character that requires percent encoding, the following error message appears:

// This password contains special characters which will be URL-encoded.

// Note
// The following characters and the space character must be converted using percent encoding if included in a username or password:

// : / ? # [ ] @ ! $ & ' ( ) * , ; = %

// For example, if your password in plain-text is p@ssw0rd'9'!, you need to encode your password as:

// p%40ssw0rd%279%27%21


