module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.js',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!**/appListen.js',
    '!**/config.js',
    '!**/jest.config.js',
  ],
  coverageThreshold: {
    global: {
      lines: 60,
    },
  },
  coverageDirectory: 'coverage',
};
