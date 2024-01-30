import type { Config } from "jest";
const config: Config = {
  coveragePathIgnorePatterns: [
    "<rootDir>/src/reportWebVitals.ts",
    "^.*\\index\\.ts[x]?$",
  ],
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: { "^.+\\.ts?$": "ts-jest", "^.+\\.tsx?$": "ts-jest" },
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/mocks/styleMock.js",
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/mocks/images/fileMock.js",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js", "<rootDir>/setupTest.ts"],
  collectCoverageFrom: ["<rootDir>/src/**"],
};
export default config;
