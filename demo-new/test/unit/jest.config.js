// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  bail: true,
  displayName: {
    name: "component",
    color: "#3a5fff",
  },
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy",
  },
  modulePaths: ["<rootDir>/src/"],
  setupFilesAfterEnv: ["<rootDir>/jest-setup.js"],
  testEnvironment: "jsdom",
  verbose: true,
};

module.exports = config;
