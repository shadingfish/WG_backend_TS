// src/schemas/resolvers/pestResolvers.ts

import { Pest, PestDocument } from '../../models/Pest.js';

// Define Query argument interface
interface PestQueryArgs {
    id?: string;
    commonName?: string;
    LatinName?: string;
}

// Define Mutation argument interface
interface PestMutationArgs {
    commonName: string;
    LatinName: string;
    description: string;
    treatment?: string;
    imageURL?: string;
}

const pestResolvers = {
    Query: {
        // Get all pest records
        getAllPests: async (): Promise<PestDocument[]> => {
            try {
                return await Pest.find();
            } catch (error) {
                console.error("Error fetching pests:", error);
                throw new Error("Failed to fetch pest data");
            }
        },

        // Get a single pest by MongoDB ID
        getPestByID: async (_: unknown, { id }: PestQueryArgs): Promise<PestDocument | null> => {
            if (!id) {
                throw new Error("ID is required");
            }
            try {
                return await Pest.findById(id);
            } catch (error) {
                console.error(`Error fetching pest with ID ${id}:`, error);
                throw new Error(`Failed to fetch pest with ID ${id}`);
            }
        },

        // Get a single pest by common name
        getPestByCommonName: async (_: unknown, { commonName }: PestQueryArgs): Promise<PestDocument | null> => {
            if (!commonName) {
                throw new Error("Common name is required");
            }
            try {
                return await Pest.findOne({ commonName });
            } catch (error) {
                console.error(`Error fetching pest with common name ${commonName}:`, error);
                throw new Error(`Failed to fetch pest with common name ${commonName}`);
            }
        },

        // Get a single pest by Latin name
        getPestByLatinName: async (_: unknown, { LatinName }: PestQueryArgs): Promise<PestDocument | null> => {
            if (!LatinName) {
                throw new Error("Latin name is required");
            }
            try {
                return await Pest.findOne({ LatinName });
            } catch (error) {
                console.error(`Error fetching pest with Latin name ${LatinName}:`, error);
                throw new Error(`Failed to fetch pest with Latin name ${LatinName}`);
            }
        },
    },

    Mutation: {
        // Add a new pest record
        addPest: async (_: unknown, args: PestMutationArgs): Promise<PestDocument> => {
            const newPest = new Pest({
                ...args,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            try {
                const savedPest = await newPest.save();
                return savedPest;
            } catch (error) {
                console.error("Error saving pest:", error);
                throw new Error("Failed to save the pest");
            }
        },
    },
};

export default pestResolvers;
