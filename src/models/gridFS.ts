// /src/models/gridFS.ts

import mongoose, { Connection, mongo } from 'mongoose';

// MongoDB connection instance
let conn: Connection;

// Initialize GridFSBucket and gfs
let gfs: mongo.Collection | null = null;
let gridFSBucket: mongo.GridFSBucket | null = null;

// Why Use createConnection for GridFS?
// Separate Connection Scope:

// mongoose.connect establishes a global connection that is shared across your application. This is fine for standard models and queries.
// mongoose.createConnection creates a separate connection instance. This is often used when you need to work with multiple databases or want to isolate certain operations like GridFS.
// GridFS Requirements:

// GridFSBucket requires direct access to the underlying db property of a Connection object. When using mongoose.connect, accessing this db property can lead to complexity, especially if other parts of your application rely on the global connection.
// Compatibility with Other Features:

// Using a separate connection for GridFS ensures that operations on GridFS do not interfere with other database activities (e.g., schema definitions or plugins).


// Connect to MongoDB using the shared `connectDB` function
(async () => {
    try {
        conn = await mongoose.createConnection(process.env.MONGO_URI as string); // Create a connection
        conn.once('open', () => {
            gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, {
                bucketName: 'uploads', // The bucket name for GridFS
            });
            gfs = conn.db.collection('uploads.files'); // Access the GridFS files collection
            console.log('GridFS initialized successfully');
        });
    } catch (error) {
        console.error('Failed to initialize GridFS:', error);
        process.exit(1); // Exit the process with an error code
    }
})();

// Export the connection and GridFSBucket
export { conn, gfs, gridFSBucket };