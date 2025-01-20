// src/schemas/resolvers/samplingPointResolvers.ts

import { SamplingPoint, SamplingPointDocument } from '../../models/SamplingPoint';

// Define Query argument interfaces
interface QueryArgs {
    id?: string;
    userId?: string;
}

// Define Mutation argument interfaces
interface AddSamplingPointArgs {
    userId: string;
    sampleId: string;
    location: {
        type: 'Point';
        coordinates: [number, number];
    };
    samplingNote?: string;
    samplingTime: Date;
    photoUrl?: string;
}

const samplingPointResolvers = {
    Query: {
        // Get all sampling points
        getSamplingPoints: async (): Promise<SamplingPointDocument[]> => {
            try {
                return await SamplingPoint.find();
            } catch (error) {
                console.error("Error fetching sampling points:", error);
                throw new Error("Failed to fetch sampling points");
            }
        },

        // Get a specific sampling point by ID
        getSamplingPoint: async (
            _: unknown,
            { id }: QueryArgs
        ): Promise<SamplingPointDocument | null> => {
            if (!id) {
                throw new Error("ID is required to fetch a sampling point");
            }
            try {
                return await SamplingPoint.findById(id);
            } catch (error) {
                console.error(`Error fetching sampling point with ID ${id}:`, error);
                throw new Error(`Failed to fetch sampling point with ID ${id}`);
            }
        },

        // Get all sampling points for a specific user
        getSamplingPointsByUserId: async (
            _: unknown,
            { userId }: QueryArgs
        ): Promise<SamplingPointDocument[]> => {
            if (!userId) {
                throw new Error("User ID is required to fetch sampling points");
            }
            try {
                return await SamplingPoint.find({ userId });
            } catch (error) {
                console.error(`Error fetching sampling points for user ${userId}:`, error);
                throw new Error(`Failed to fetch sampling points for user ${userId}`);
            }
        },
    },

    Mutation: {
        // Add a new sampling point
        addSamplingPoint: async (
            _: unknown,
            args: AddSamplingPointArgs
        ): Promise<SamplingPointDocument> => {
            const newPoint = new SamplingPoint(args);
            try {
                const savedPoint = await newPoint.save();
                return savedPoint;
            } catch (error) {
                console.error("Error saving sampling point:", error);
                throw new Error("Failed to save the sampling point");
            }
        },

        // Delete a sampling point by ID
        deleteSamplingPoint: async (
            _: unknown,
            { id }: QueryArgs
        ): Promise<string> => {
            if (!id) {
                throw new Error("ID is required to delete a sampling point");
            }
            try {
                const deleted = await SamplingPoint.findByIdAndDelete(id);
                if (!deleted) {
                    throw new Error(`Sampling point with ID ${id} not found`);
                }
                return `Sampling point with ID ${id} deleted successfully.`;
            } catch (error) {
                console.error(`Error deleting sampling point with ID ${id}:`, error);
                throw new Error(`Failed to delete sampling point with ID ${id}`);
            }
        },
    },
};

export default samplingPointResolvers;
