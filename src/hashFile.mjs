// src/hashFile.mjs
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

async function hashFile(filePath) {
  const data = await readFile(filePath);
  const hash = createHash('sha256');
  hash.update(data);
  return hash.digest('hex');
}

const filePath = './path/to/your/file.txt';
hashFile(filePath).then((hash) => console.log(`Hash: ${hash}`));