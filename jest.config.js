const config = {
    'roots': ['<rootDir>/test/unit'],
    'modulePaths': ['<rootDir>/src'],
    'moduleDirectories': [
        'node_modules',
    ],
    'moduleFileExtensions': [
        'js',
        'json',
    ],
    'moduleNameMapper': {
        '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
        '@common/(.*)': '<rootDir>/../common/src/$1',
        'test/(.*)': '<rootDir>/test/$1',
        'components':'<rootDir>/src/components'
    },
    'transform': {
        '^.+\\.(t|j)sx?$': 'ts-jest'
    },
    'preset': 'ts-jest',
    'testEnvironment': 'jsdom',
    'testRegex': '(/__tests__/.*|(\\.|/)(test|spec))\\.js?$',
    'reporters': ['default', ['jest-junit', {outputDirectory: 'test'}]]

};

module.exports = config;
