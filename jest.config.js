module.exports = {
  browser: true,
  collectCoverageFrom: [
    "src/**/*.ts",
    "src/**/*.tsx",
  ],
  "setupFiles": ["./setupTests.js"],
  coverageReporters: ["json", "text"],
}
