module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['./jest.setup.js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!@web3-storage/multipart-parser/esm/)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  modulePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/build/',
    '<rootDir>/out/',
    '<rootDir>/hydrogen-storefront/hydrogen-storefront/',
    '<rootDir>/Documents/your-project-directory/',
    '<rootDir>/source/repos/florafinessesbeauty/beautyfortintegration/',
    '<rootDir>/Downloads/cli-10.9.0/cli-10.9.0/',
    '<rootDir>/.vscode/',
  ],
};