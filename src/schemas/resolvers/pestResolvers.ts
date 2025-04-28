// src/schemas/resolvers/pestResolvers.ts

import { Pest, PestDocument } from '../../models/Pest.js';
import { GraphQLUpload } from 'graphql-upload';
import { importPestSpreadsheet, exportPestSpreadsheet } from '../../controllers/pestSpreadsheetController.js';

// Define Query argument interface
interface PestQueryArgs {
    id?: string;
    commonName?: string;
    latinName?: string;
}

// Define Mutation argument interface
interface PestMutationArgs {
    commonName: string;
    latinName: string;
    description: string;
    distribution?: string[];
    economicThreshold?: number;
    treatment?: string;
    hardToDetect?: boolean;
    singleDetectionSevere?: boolean;
    imageURL?: string;
}

interface PestUpdateArgs {
    id: string;
    commonName?: string;
    latinName?: string;
    description?: string;
    distribution?: string[];
    economicThreshold?: number;
    treatment?: string;
    hardToDetect?: boolean;
    singleDetectionSevere?: boolean;
    imageURL?: string;
}

interface PestDeleteArgs {
    id: string;
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
        getPestByLatinName: async (_: unknown, { latinName }: PestQueryArgs): Promise<PestDocument | null> => {
            if (!latinName) {
                throw new Error("Latin name is required");
            }
            try {
                return await Pest.findOne({ latinName });
            } catch (error) {
                console.error(`Error fetching pest with Latin name ${latinName}:`, error);
                throw new Error(`Failed to fetch pest with Latin name ${latinName}`);
            }
        },
    },

    Mutation: {
        // Add a new pest record
        addPest: async (_: unknown, args: PestMutationArgs): Promise<PestDocument> => {
            const newPest = new Pest({ ...args });
            try {
                return await newPest.save();
            } catch (error) {
                console.error("Error saving pest:", error);
                throw new Error("Failed to save the pest");
            }
        },
    
        // Update existing pest by ID
        updatePest: async (_: unknown, args: PestUpdateArgs): Promise<PestDocument | null> => {
            const { id, ...updateFields } = args;
            try {
                const updated = await Pest.findByIdAndUpdate(
                    id,
                    { ...updateFields, updatedAt: new Date() },
                    { new: true } // Return the updated document
                );
                if (!updated) {
                    throw new Error(`Pest with ID ${id} not found`);
                }
                return updated;
            } catch (error) {
                console.error("Error updating pest:", error);
                throw new Error("Failed to update the pest");
            }
        },
    
        // Delete pest by ID
        deletePest: async (_: unknown, { id }: PestDeleteArgs): Promise<boolean> => {
            try {
                const result = await Pest.findByIdAndDelete(id);
                return !!result;
            } catch (error) {
                console.error("Error deleting pest:", error);
                throw new Error("Failed to delete the pest");
            }
        },

        importPestSpreadsheet: async (_: any, { file }: { file: Promise<any> }) =>
            importPestSpreadsheet(file),
      
        exportPestSpreadsheet: async (_: any, { data, format }) =>
        exportPestSpreadsheet(data, format),
    },
};

export default pestResolvers;
