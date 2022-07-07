// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  bail: true,
  displayName: {
    name: "component",
    color: "#3a5fff",
  },
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy"
  },
  modulePathIgnorePatterns: ['demo-new'],
  modulePaths: ["<rootDir>/src/"],
  reporters: ["default", ["jest-junit", { outputDirectory: "test" }]],
  setupFilesAfterEnv: ["<rootDir>/jest-setup.js"],
  testEnvironment: "jsdom",
  verbose: true,
};

module.exports = config;
