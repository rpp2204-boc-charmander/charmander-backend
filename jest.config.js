module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['.__tests__/**'],
  coverageThreshold: {
    global: {
      lines: 60,
    },
  },
  coverageDirectory: 'coverage',
};
