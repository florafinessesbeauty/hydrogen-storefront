import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

global.Response = require('node-fetch').Response;