// src/workerMain.js
import { Worker } from 'node:worker_threads';

const worker = new Worker('./src/worker.js');

worker.on('message', (result) => {
  console.log(`Result: ${result}`);
});

worker.postMessage(42); // Example data