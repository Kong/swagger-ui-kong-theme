const config = {
    'verbose': true,
    'bail': true,
    'displayName': {
        name: 'KongTheme Component',
        color: '#3a5fff'
    },
    'moduleDirectories': ['node_modules'],
    'roots': ['<rootDir>'],
    'modulePaths': ['<rootDir>/src'],
    'moduleFileExtensions': [
        'js',
        'json',
    ],
    'moduleNameMapper': {
        '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
        '@common/(.*)': '<rootDir>/../common/src/$1',
        'test/(.*)': '<rootDir>/test/$1',
        'components':'<rootDir>/src'
    },
    'testEnvironment': 'jsdom',
    'testRegex': '(/__tests__/.*|(\\.|/)(test|spec))\\.js?$',
    'reporters': ['default', ['jest-junit', {outputDirectory: 'test'}]]

};

module.exports = config;
