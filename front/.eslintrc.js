module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  parserOptions: {
    sourceType: "module",
    // ecmaFeatures: {
    //   "jsx": true
    // },
    ecmaVersion: "latest",
    project: ['./tsconfig.json'],
    warnOnUnsupportedTypeScriptVersion: false,
  },
  extends: [
    // "next/core-web-vitals",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"

  ],
  plugins: [
    "react",
    "react-hooks",
    // "@typescript-eslint",
    // "react-hooks"
  ],
  settings: {
    "react": {
      "version": "detect"
    },
  },
  rules: {
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "react-hooks/exhaustive-deps": "off",
    "react-hooks/rules-of-hooks": "off",
    "react-hooks/exhaustive-deps": "warn"
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