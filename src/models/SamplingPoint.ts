import mongoose, { Schema, Document, model } from 'mongoose';

// Define GeoJSON Point interface
interface GeoPoint {
    type: 'Point'; // Must be "Point"
    coordinates: [number, number]; // [longitude, latitude]
}

// Define SamplingPointDocument interface
export interface SamplingPointDocument extends Document {
    userId: string; // ID of the user who owns this sampling point
    sampleId: string; // Unique ID of the sample
    location: GeoPoint; // The geolocation of the sampling point
    samplingNote?: string; // Notes about the sampling point
    samplingTime: Date; // The time when the sampling was performed
    photoUrl?: string; // Optional URL for a photo taken at the sampling site
}

// Define Schema
const SamplingPointSchema = new Schema<SamplingPointDocument>({
    userId: {
        type: String, // Reference to the user who owns the sampling point
        required: true,
    },
    sampleId: {
        type: String, // Unique identifier for the sample
        required: true,
    },
    location: {
        type: {
            type: String,
            enum: ['Point'], // GeoJSON type must be "Point"
            required: true,
        },
        coordinates: {
            type: [Number], // Array of numbers [longitude, latitude]
            required: true,
        },
    },
    samplingNote: {
        type: String, // Notes about the sampling point
        required: false,
    },
    samplingTime: {
        type: Date, // The time the sample was taken
        required: true, // This field is mandatory
    },
    photoUrl: {
        type: String, // URL pointing to the photo of the sampling site
        required: false, // This field is optional
    },
});

// Add 2dsphere index for geolocation
SamplingPointSchema.index({ location: '2dsphere' });

// Export Mongoose model
export const SamplingPoint = model<SamplingPointDocument>('SamplingPoint', SamplingPointSchema);
