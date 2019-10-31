module.exports = {
  // automatically clears mock calls and instances between each test
  clearMocks: true,
  roots: ['<rootDir>'],
  // disables diagnostics which allows to configure error reporting
  globals: {
    'babel-jest': {
      diagnostics: false,
    },
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'babel-jest',
  },
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '^.+\\.(css|scss|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'identity-obj-proxy',
    electron: '<rootDir>/__mocks__/electron.js',
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
