// src/global.d.ts

declare module 'graphql-upload' {
    import { RequestHandler } from 'express';
  
    export const graphqlUploadExpress: (options?: any) => RequestHandler;
    export const GraphQLUpload: any;
  }