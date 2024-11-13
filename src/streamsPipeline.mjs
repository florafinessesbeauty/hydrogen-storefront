// src/streamsPipeline.mjs
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream';
import { createGzip } from 'node:zlib';

const source = createReadStream('./path/to/your/file.txt');
const destination = createWriteStream('./path/to/your/file.txt.gz');
const gzip = createGzip();

pipeline(source, gzip, destination, (err) => {
  if (err) {
    console.error('Pipeline failed', err);
  } else {
    console.log('Pipeline succeeded');
  }
});