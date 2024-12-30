// import { GraphQLUpload } from 'graphql-upload';
// import { gridFSBucket, gfs } from '../../models/gridFS';
// import { ObjectId } from 'mongodb';
// import { ReadStream } from 'fs';

// // 定义文件类型接口
// interface FileInput {
//     createReadStream: () => ReadStream;
//     filename: string;
//     mimetype: string;
//     encoding: string;
// }

// interface FileOutput {
//     id: string;
//     filename: string;
//     mimetype: string;
//     encoding: string;
//     url: string;
//     createdAt: Date;
//     updatedAt: Date;
// }

// const fileResolvers = {
//     Upload: GraphQLUpload,

//     Query: {
//         // 获取单个文件信息
//         getFile: async (_: unknown, { id }: { id: string }): Promise<FileOutput> => {
//             try {
//                 const file = await gfs.findOne({ _id: new ObjectId(id) });
//                 if (!file) {
//                     throw new Error('File not found');
//                 }
//                 return {
//                     id: file._id.toString(),
//                     filename: file.filename,
//                     mimetype: file.contentType,
//                     encoding: '7bit',
//                     url: `/files/${file._id}`, // 文件下载的 URL 地址
//                     createdAt: file.uploadDate,
//                     updatedAt: file.uploadDate,
//                 };
//             } catch (error) {
//                 throw new Error('Error retrieving file: ' + error.message);
//             }
//         },

//         // 获取所有文件信息
//         getFiles: async (): Promise<FileOutput[]> => {
//             try {
//                 const files = await gfs.find().toArray();
//                 return files.map(file => ({
//                     id: file._id.toString(),
//                     filename: file.filename,
//                     mimetype: file.contentType,
//                     encoding: '7bit',
//                     url: `/files/${file._id}`, // 文件下载的 URL 地址
//                     createdAt: file.uploadDate,
//                     updatedAt: file.uploadDate,
//                 }));
//             } catch (error) {
//                 throw new Error('Error retrieving files: ' + error.message);
//             }
//         },
//     },

//     Mutation: {
//         // 上传文件到 GridFS
//         uploadFile: async (_: unknown, { file }: { file: Promise<FileInput> }): Promise<FileOutput> => {
//             const { createReadStream, filename, mimetype, encoding } = await file;

//             return new Promise((resolve, reject) => {
//                 const uploadStream = gridFSBucket.openUploadStream(filename, {
//                     contentType: mimetype,
//                 });

//                 createReadStream()
//                     .pipe(uploadStream)
//                     .on('error', (error) => reject(new Error('Error uploading file: ' + error.message)))
//                     .on('finish', () => {
//                         resolve({
//                             id: uploadStream.id.toString(),
//                             filename,
//                             mimetype,
//                             encoding,
//                             url: `/files/${uploadStream.id}`,
//                             createdAt: uploadStream.uploadDate,
//                             updatedAt: uploadStream.uploadDate,
//                         });
//                     });
//             });
//         },

//         // 更新文件信息（不支持更新文件内容，仅更新元数据）
//         updateFile: async (
//             _: unknown,
//             { file }: { file: { id: string; filename?: string; mimetype?: string; encoding?: string } }
//         ): Promise<FileOutput> => {
//             const { id, filename, mimetype, encoding } = file;
//             const fileId = new ObjectId(id);

//             try {
//                 const result = await gfs.updateOne(
//                     { _id: fileId },
//                     {
//                         $set: {
//                             filename: filename || undefined,
//                             contentType: mimetype || undefined,
//                         },
//                     }
//                 );

//                 if (result.modifiedCount === 0) {
//                     throw new Error('File not found or no changes made');
//                 }

//                 const updatedFile = await gfs.findOne({ _id: fileId });
//                 if (!updatedFile) {
//                     throw new Error('Updated file not found');
//                 }

//                 return {
//                     id: updatedFile._id.toString(),
//                     filename: updatedFile.filename,
//                     mimetype: updatedFile.contentType,
//                     encoding: encoding || '7bit',
//                     url: `/files/${updatedFile._id}`,
//                     createdAt: updatedFile.uploadDate,
//                     updatedAt: new Date(),
//                 };
//             } catch (error) {
//                 throw new Error('Error updating file: ' + error.message);
//             }
//         },

//         // 删除文件
//         deleteFile: async (_: unknown, { id }: { id: string }): Promise<string> => {
//             const fileId = new ObjectId(id);

//             try {
//                 await gridFSBucket.delete(fileId);
//                 return `File with id ${id} deleted successfully.`;
//             } catch (error) {
//                 throw new Error('Error deleting file: ' + error.message);
//             }
//         },
//     },
// };

// export default fileResolvers;
