// src/models/Pest.ts

import mongoose, { Schema, Document, model } from 'mongoose';

// Define PestDocument interface
export interface PestDocument extends Document {
    commonName: string; // Common Name of the pest
    LatinName: string; // Latin Name of the pest
    description: string; // detailed description
    treatment?: string; // default ""
    imageURL?: string; // default ""
    createdAt: Date;
    updatedAt: Date;
}

// Define Schema
const PestSchema = new Schema<PestDocument>({
    commonName: {
        type: String, 
        required: true,
    },
    LatinName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    treatment: {
        type: String,
        required: false,
    },
    imageURL: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});


// Export Mongoose model
export const SamplingPoint = model<PestDocument>('SamplingPoint', PestSchema);
