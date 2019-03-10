module.exports = {
    "extends": ["eslint:recommended", "plugin:jest/recommended"],
    "env": {
        "node": true,
        "es6": true
    },
    "rules": {
        "no-unused-vars": "off",
        "no-console": "off"
    },
    "parser": "typescript-eslint-parser"
};
