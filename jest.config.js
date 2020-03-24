module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["cypress/.*"],
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.test.json"
    }
  }
};
