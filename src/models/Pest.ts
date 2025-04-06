// src/models/Pest.ts

import mongoose, { Schema, Document, model } from 'mongoose';

// Define PestDocument interface
export interface PestDocument extends Document {
    commonName: string; // Common Name of the pest
    latinName: string; // Latin Name of the pest
    description: string; // detailed description
    distribution: string[]; // distributed area of this pest
    economicThreshold: number;
    treatment: string; // default ""
    hardToDetect: boolean,
    singleDetectionSevere: boolean,
    imageURL?: string; // default ""
    // createdAt
    // updatedAt
}

// Define Schema
const PestSchema = new Schema<PestDocument>({
    commonName: {
        type: String, 
        default: "No commonName available",
    },
    latinName: {
        type: String,
        default: "No latinName available",
    },
    description: {
        type: String,
        default: "No description available",
    },
    distribution: {
        type: [String],
        default: [],
    },
    economicThreshold: {
        type: Number,
        default: 10.0,
    },
    treatment: {
        type: String,
        default: "No treatment available",
    },
    hardToDetect: {
        type: Boolean,
        default: false
    },
    singleDetectionSevere: {
        type: Boolean,
        default: false
    },
    imageURL: {
        type: String,
        required: false,
    },
    }, {
    timestamps: true, // This will add createdAt and updatedAt automatically in the database
  });


// Export Mongoose model
export const Pest = model<PestDocument>('Pest', PestSchema);
