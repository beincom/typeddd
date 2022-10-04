import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  testTimeout: 30000,
  preset: 'ts-jest',
  runtime: '@side/jest-runtime',
  collectCoverage: false,
  collectCoverageFrom: ['<rootDir>/packages/*/src/**/*.ts'],
  moduleNameMapper: {
    '@typeddd/(.*)/package.json': '<rootDir>/packages/$1/package.json',
    '@typeddd/(.*)': '<rootDir>/packages/$1/src',
  },
  modulePathIgnorePatterns: ['dist/package.json', '<rootDir>/package.json'],
  setupFiles: ['<rootDir>/tests/setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: 'tests/tsconfig.json',
      isolatedModules: true,
    },
  },
};

export default config;
