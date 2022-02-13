/**
 * @author Sotirios Karageorgopoulos
 */
module.exports = {
    roots: ['<rootDir>/src'],
    transform: {
      '\\.(js|jsx)?$': 'babel-jest',
      '.(css|less)$': '<rootDir>/style-test.js'
    }, 
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
    testPathIgnorePatterns: ['/node_modules/', '/public/'],
    setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
    testEnvironment: "jsdom"
  };