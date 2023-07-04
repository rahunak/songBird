module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        indent: ['error', 4, { SwitchCase: 1 }],
        'linebreak-style': ['error', 'windows'],
        'no-plusplus': 'off',
        'no-alert': 'off',
        'prefer-rest-params': 'off',
        'func-names': 'off',
        'no-restricted-globals': 'off',
        'max-classes-per-file': 'off',
        'no-unused-vars': 'off',
    },
};
