// /src/models/Field.ts

import mongoose, { Schema, Document, model } from 'mongoose';

// Define GeoJSON Polygon Interface
interface GeoLocation {
    type: 'Polygon'; // Must be "Polygon"
    coordinates: [number, number][][]; // Coordinates of polygon
}

// Define FieldDocument Interface
export interface FieldDocument extends Document {
    field: string; // Field Nickname
    userId: string; // Farmer ID
    updateTime: Date; // Last modified time
    soilType?: string; // Soil Type
    geoLocation: GeoLocation; // GeoJSON Polygon
    cityOrTown?: string; // City or Town
    crops?: string[]; // List of crop IDs
}

// Define Schema
const FieldSchema = new Schema<FieldDocument>({
    field: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    updateTime: {
        type: Date,
        required: true,
        default: Date.now,
    },
    soilType: {
        type: String,
        required: false,
    },
    geoLocation: {
        type: {
            type: String,
            enum: ['Polygon'], // Must be "Polygon"
            required: true,
        },
        coordinates: {
            type: [[[Number]]], // 3-nested array [ [ [lng, lat], [lng, lat], ... ] ]
            required: true,
        },
    },
    cityOrTown: {
        type: String,
        required: false,
    },
    crops: {
        type: [String],
        required: false,
    },
});

// Add 2dsphere index
FieldSchema.index({ geoLocation: '2dsphere' });

export const Field = model<FieldDocument>('Field', FieldSchema);