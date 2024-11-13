// src/worker.js
import { parentPort } from 'node:worker_threads';

parentPort.on('message', (data) => {
  const result = data * 2; // Example computation
  parentPort.postMessage(result);
});