// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    verbose: true,
    bail: true,
    displayName: {
        name: 'KongTheme Component',
        color: '#3a5fff'
    },
    modulePaths: ['<rootDir>/src/'],    
    testEnvironment: 'jsdom',
    reporters: ['default', ['jest-junit', {outputDirectory: 'test'}]]

};

module.exports = config;
