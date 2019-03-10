module.exports = {
  transform: {
    "^.+\\.ts?$": "ts-jest"
  },
  moduleFileExtensions: ["ts", "js"],
  testMatch: ["**/**/*.test.(ts|js)"],
  testEnvironment: "node"
};
