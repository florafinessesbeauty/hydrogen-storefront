// src/server.test.js
import { createServer } from 'node:http';
import { describe, it, expect } from '@jest/globals';

describe('HTTP Server', () => {
  it('should respond with "Hello World!"', (done) => {
    const server = createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello World!\n');
    });

    server.listen(3000, '127.0.0.1', () => {
      const options = {
        hostname: '127.0.0.1',
        port: 3000,
        path: '/',
        method: 'GET',
      };

      const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          expect(data).toBe('Hello World!\n');
          server.close();
          done();
        });
      });

      req.end();
    });
  });
});