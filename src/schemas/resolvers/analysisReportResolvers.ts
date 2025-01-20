// src/schemas/resolvers/analysisReportResolvers.ts

import { AnalysisReport, AnalysisReportDocument } from '../../models/AnalysisReport.js';

// Define Query argument interfaces
interface QueryArgs {
    id?: string;
    userId?: string;
    analystId?: string;
}

// Define Mutation argument interfaces
interface MutationArgs {
    userId: string;
    analystId: string;
    outputTime: Date;
    detectionTimeRange: {
        start: Date;
        end: Date;
    };
    notableSpecies?: Array<{
        fieldId: string;
        nameCode: string;
        level: string;
    }>;
    cloudReportLocation: string;
    summary: string;
}

const analysisReportResolvers = {
    Query: {
        // Get all analysis reports
        getAnalysisReports: async (): Promise<AnalysisReportDocument[]> => {
            try {
                return await AnalysisReport.find();
            } catch (error) {
                console.error("Error fetching analysis reports:", error);
                throw new Error("Failed to fetch analysis reports");
            }
        },

        // Get a specific analysis report by ID
        getAnalysisReport: async (
            _: unknown,
            { id }: QueryArgs
        ): Promise<AnalysisReportDocument | null> => {
            if (!id) {
                throw new Error("ID is required to fetch an analysis report");
            }
            try {
                return await AnalysisReport.findById(id);
            } catch (error) {
                console.error(`Error fetching analysis report with ID ${id}:`, error);
                throw new Error(`Failed to fetch analysis report with ID ${id}`);
            }
        },

        // Get all analysis reports for a specific user
        getAnalysisReportsByUserId: async (
            _: unknown,
            { userId }: QueryArgs
        ): Promise<AnalysisReportDocument[]> => {
            if (!userId) {
                throw new Error("User ID is required to fetch analysis reports");
            }
            try {
                return await AnalysisReport.find({ userId });
            } catch (error) {
                console.error(`Error fetching analysis reports for user ${userId}:`, error);
                throw new Error(`Failed to fetch analysis reports for user ${userId}`);
            }
        },

        // Get all analysis reports for a specific analyst
        getAnalysisReportsByAnalystId: async (
            _: unknown,
            { analystId }: QueryArgs
        ): Promise<AnalysisReportDocument[]> => {
            if (!analystId) {
                throw new Error("Analyst ID is required to fetch analysis reports");
            }
            try {
                return await AnalysisReport.find({ analystId });
            } catch (error) {
                console.error(`Error fetching analysis reports for analyst ${analystId}:`, error);
                throw new Error(`Failed to fetch analysis reports for analyst ${analystId}`);
            }
        },
    },

    Mutation: {
        // Add a new analysis report
        addAnalysisReport: async (
            _: unknown,
            args: MutationArgs
        ): Promise<AnalysisReportDocument> => {
            const newReport = new AnalysisReport(args);
            try {
                const savedReport = await newReport.save();
                return savedReport;
            } catch (error) {
                console.error("Error saving analysis report:", error);
                throw new Error("Failed to save the analysis report");
            }
        },
    },
};

export default analysisReportResolvers;
