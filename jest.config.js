module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['.__tests__/**'],
  coverageThreshold: {
    global: {
      lines: 60,
    },
  },
  coverageDirectory: 'coverage',
};
