module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      "jsx": true
    },
    ecmaVersion: "latest",
    project: ['./tsconfig.json'],
    warnOnUnsupportedTypeScriptVersion: false,
  },
  extends: [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:react/recommended",
    // "eslint:all",
    "plugin:@typescript-eslint/eslint-recommended",
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
    // "prettier/@typescript-eslint",
    // 'plugin:prettier/recommended',
    // "plugin:import/warnings",
    // "prettier"
    // "plugin:import/warnings",
    "prettier"
  ],
  plugins: [
    "react",
    "react-hooks",
    "@typescript-eslint",
    "react-hooks"
  ],
  // overrides: [
  //   {
  //     "files": ["**/*.tsx"],
  //     "rules": {
  //       "react/prop-types": "off"
  //     }
  //   }
  // ],
  settings: {
    "react": {
      "version": "detect"
    },
  },
  rules: {
    "react-hooks/exhaustive-deps": "off",
    // "import/order": [
    //   "error",
    //   {
    //     "alphabetize": {
    //       "order": "asc"
    //     }
    //   }
    // ]
  },
  ignorePatterns: [
    "**/public/*",
    "**/node_modules/*",
    "**/.vscode/*",
    ".eslintrc.js",
    ".prettierrc.js",
  ],
  root: true,
}