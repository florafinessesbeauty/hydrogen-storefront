module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['./jest.setup.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!@web3-storage/multipart-parser/esm/)',
  ],
};