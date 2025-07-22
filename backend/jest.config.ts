import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: [
    "**/tests/unit/**/*.test.ts",
    "**/tests/integration/**/*.test.ts"
  ],
  verbose: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/server.ts",
    "!src/config/**"
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  }
};

export default config;
