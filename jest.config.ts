import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  testTimeout: 30000,
  preset: 'ts-jest',
  runtime: '@side/jest-runtime',
  collectCoverage: false,
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['<rootDir>/packages/*/src/**/*.ts'],
  moduleNameMapper: {
    '@beincom/(.*)/package.json': '<rootDir>/packages/$1/package.json',
    '@beincom/(.*)': '<rootDir>/packages/$1/src',
  },
  modulePathIgnorePatterns: ['dist/package.json', '<rootDir>/package.json'],
  setupFiles: ['<rootDir>/tests/setup.ts'],
};

export default config;
