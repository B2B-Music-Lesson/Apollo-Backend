module.exports = {
  preset: "ts-jest",
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  testMatch: ['**/*.test.js'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    "^.+\\.(js|ts)$": "babel-jest",
  },
  "setupFilesAfterEnv": ["./setupTest.js"]
};
