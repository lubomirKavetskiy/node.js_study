const fs = require('fs');
const zlib = require('zlib');

const readStream = fs.createReadStream('./docs/text.txt', { encoding: 'utf8' });
const writeStream = fs.createWriteStream('./docs/new-text.txt');
const compressedStream = zlib.createGzip();

// readStream.on('data', (chunk) => {
//   writeStream.write('\nNEW CHUNK\n');
//   writeStream.write(chunk);
//   writeStream.write('\nEND CHUNK\n');
// });

const handleErrors = (err) => {
  console.log('ERROR: ', err);
  readStream.destroy();
  writeStream.end('Finished with error...');
};

readStream
  .on('error', handleErrors)
  .pipe(compressedStream)
  .pipe(writeStream)
  .on('error', handleErrors);
