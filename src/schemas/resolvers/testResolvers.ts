// src/schemas/resolvers/testResolvers.ts

const {
  GraphQLUpload,
} = require('graphql-upload');
const { finished } = require('stream/promises');


const testResolvers = {
    // This maps the `Upload` scalar to the implementation provided
    // by the `graphql-upload` package.
    Upload: GraphQLUpload,
  
    Mutation: {
      singleUpload: async (parent, { file }) => {
        const { createReadStream, filename, mimetype, encoding } = await file;
  
        // Invoking the `createReadStream` will return a Readable Stream.
        // See https://nodejs.org/api/stream.html#stream_readable_streams
        const stream = createReadStream();
  
        // This is purely for demonstration purposes and will overwrite the
        // local-file-output.txt in the current working directory on EACH upload.
        const out = require('fs').createWriteStream('local-file-output.txt');
        stream.pipe(out);
        await finished(out);
  
        return { filename, mimetype, encoding };
      },
    },
  };


export default testResolvers;