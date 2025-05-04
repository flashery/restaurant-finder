module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  moduleNameMapper: {
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    
  },
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      isolatedModules: true, // migrated here
    }],
  },
  silent: false,
};
