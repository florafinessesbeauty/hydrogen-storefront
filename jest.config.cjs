// jest.config.cjs
module.exports = {
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    '/node_modules/(?!@web3-storage/multipart-parser/esm/)',
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
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
