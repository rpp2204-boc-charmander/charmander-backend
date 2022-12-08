module.exports = {
  preset: '@shelf/jest-mongodb',
  collectCoverage: true,
  collectCoverageFrom: ['./server/**'],
  coverageThreshold: {
    global: {
      lines: 60,
    },
  },
  coverageDirectory: 'coverage',
  globalTeardown: './test-teardown-globals.js',
};
