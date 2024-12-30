// src/schemas/resolvers/fieldResolvers.ts

import { Field, FieldDocument } from '../../models/Field';
import { GraphQLResolveInfo } from 'graphql';

const fieldResolvers = {
    Query: {
        // Fetch all fields
        getFields: async (): Promise<FieldDocument[]> => {
            try {
                return await Field.find();
            } catch (error) {
                console.error("Error fetching fields:", error);
                throw new Error("Error fetching fields");
            }
        },

        // Fetch a single field by ID
        getField: async (
            _: unknown,
            { id }: { id: string },
            __: GraphQLResolveInfo
        ): Promise<FieldDocument | null> => {
            try {
                return await Field.findById(id);
            } catch (error) {
                console.error(`Error fetching field with id ${id}:`, error);
                throw new Error(`Error fetching field with id ${id}`);
            }
        },

        // Fetch fields by user ID
        getFieldsByUserId: async (
            _: unknown,
            { userId }: { userId: string },
            __: GraphQLResolveInfo
        ): Promise<FieldDocument[]> => {
            try {
                return await Field.find({ userId });
            } catch (error) {
                console.error(`Error fetching fields for user ${userId}:`, error);
                throw new Error(`Error fetching fields for user ${userId}`);
            }
        },
    },

    Mutation: {
        // Add a new field
        addField: async (
            _: unknown,
            args: Partial<FieldDocument>,
            __: GraphQLResolveInfo
        ): Promise<FieldDocument> => {
            try {
                const newField = new Field({
                    ...args,
                    updateTime: new Date(),
                });

                const savedField = await newField.save();
                return savedField;
            } catch (error) {
                console.error("Error saving field:", error);
                throw new Error("Error saving the field to the database");
            }
        },
    },
};

export default fieldResolvers;
