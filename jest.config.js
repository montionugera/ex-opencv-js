module.exports = {
  automock: false,
  browser: false,
  bail: false,
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'node'],
  moduleDirectories: ['<rootDir>/src', 'node_modules'],
  setupFiles: ['dotenv/config', '<rootDir>/jest.setup.js'],
  verbose: true,
  coverageReporters: ['text', 'html'],
  coverageDirectory: '<rootDir>/coverage',
}
