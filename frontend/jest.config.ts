import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testMatch: ["**/tests/**/*.(test|spec).ts?(x)"],
  setupFilesAfterEnv: ["<rootDir>/tests/setupTests.ts"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(png|jpg|jpeg|gif|svg)$": "<rootDir>/tests/__mocks__/fileMock.js",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  verbose: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/index.tsx",       
    "!src/server.ts",      
    "!src/config/**"        
  ]
};

export default config;
