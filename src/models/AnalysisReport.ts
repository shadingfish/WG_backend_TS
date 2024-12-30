// /src/models/AnalysisReport.ts

import mongoose, { Document, Schema, model } from 'mongoose';

interface DetectionTimeRange {
    start: Date;
    end: Date;
}

interface notableSpecies {
    fieldId: string;
    nameCode: string
    level: string;
}

export interface AnalysisReportDocument extends Document {
    userId: string;
    analystId: string;
    outputTime: Date;
    detectionTimeRange: DetectionTimeRange;
    notableSpecies?: notableSpecies[];
    cloudReportLocation: string;
    summary: string;
    createdAt: Date;
    updatedAt: Date;
}

// 定义 Mongoose Schema
const AnalysisReportSchema = new Schema<AnalysisReportDocument>({
    userId: {
        type: String,
        required: true,
    },
    analystId: {
        type: String,
        required: true,
    },
    outputTime: {
        type: Date,
        required: true,
    },
    detectionTimeRange: {
        start: {
            type: Date,
            required: true,
        },
        end: {
            type: Date,
            required: true,
        },
    },
    notableSpecies: [
        {
            fieldId: {
                type: String,
                required: false,
            },
            nameCode: {
                type: String,
                required: false,
            },
            level: {
                type: String,
                required: false,
            },
        },
    ],
    cloudReportLocation: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
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

export const AnalysisReport = model<AnalysisReportDocument>('AnalysisReport', AnalysisReportSchema);


// AnalysisReport
// 中文
// AnalysisReport 是一个由 Mongoose 创建的模型，用于与 MongoDB 中的 AnalysisReport 集合进行交互。
// 这个模型是基于 AnalysisReportSchema 定义的，封装了数据库的读、写、更新和删除等操作。
// 通过 AnalysisReport 模型，可以使用 Mongoose 提供的方法（如 find、findById、save 等）直接操作数据库中的分析报告数据。
// 英文
// AnalysisReport is a Mongoose model created to interact with the AnalysisReport collection in MongoDB.
// It is based on the AnalysisReportSchema, encapsulating database operations like read, write, update, and delete.
// Using the AnalysisReport model, you can directly perform operations on the analysis report data in the database through Mongoose methods like find, findById, save, etc.
// AnalysisReportDocument
// 中文
// AnalysisReportDocument 是一个 TypeScript 接口，扩展了 Mongoose 的 Document 接口，描述了分析报告文档的类型。
// 它定义了 MongoDB 集合中每个文档的字段及其数据类型，例如 userId 是一个字符串，detectionTimeRange 是一个包含 start 和 end 的对象。
// 这个接口提供了类型安全，可以在代码中提示开发者某个字段是否存在以及其数据类型。
// 英文
// AnalysisReportDocument is a TypeScript interface extending the Mongoose Document interface, describing the types of fields in an analysis report document.
// It defines the structure and types of each document in the MongoDB collection, such as userId being a string, and detectionTimeRange being an object containing start and end.
// This interface ensures type safety, helping developers understand the fields and their types in the code.
// AnalysisReportSchema
// 中文
// AnalysisReportSchema 是一个 Mongoose 模式（Schema），定义了 AnalysisReport 集合中文档的结构和约束。
// 它描述了每个字段的属性，例如数据类型（type）、是否必需（required）以及默认值（default）。
// Schema 是创建 Mongoose 模型的基础，决定了如何验证和存储数据到数据库中。
// 英文
// AnalysisReportSchema is a Mongoose schema that defines the structure and constraints of documents in the AnalysisReport collection.
// It describes the properties of each field, such as its type (type), whether it is required (required), and its default value (default).
// The schema serves as the foundation for creating a Mongoose model, determining how data is validated and stored in the database.
// 三者关系
// AnalysisReportSchema：

// 用于定义数据结构和验证规则。
// 是模型 AnalysisReport 的基础。
// AnalysisReportDocument：

// 提供 TypeScript 类型声明，用于描述文档结构，增强代码的类型安全性。
// AnalysisReport：

// 由 AnalysisReportSchema 创建的模型，连接到 MongoDB 中的集合，用于操作数据。
// 中英文总结
// 中文：
// AnalysisReportSchema 定义了数据库中数据的结构；AnalysisReportDocument 描述了代码中的类型；AnalysisReport 是用于操作数据库的模型。

// 英文：
// AnalysisReportSchema defines the database structure, AnalysisReportDocument describes the type in the code, and AnalysisReport is the model used to manipulate the database.
