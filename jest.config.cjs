/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/mocks/styleMock.js",
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/mocks/images/fileMock.js",
  },
};
