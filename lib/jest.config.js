module.exports = {
  automock: false,
  browser: false,
  bail: false,
  moduleFileExtensions: ['js'],
  moduleDirectories: ['<rootDir>/src', 'node_modules'],
  setupFiles: ['dotenv/config', '<rootDir>/jest.setup.js'],
  verbose: true,
  coverageReporters: ['text', 'html'],
  coverageDirectory: '<rootDir>/coverage',
  testPathIgnorePatterns: ['node_modules', 'dist'],
}
