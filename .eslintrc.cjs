/**
 * ESLint + Prettier + Babel Parser (JSX)
 * --------------------------------------------------
 * Dependências necessárias:
 *   npm install -D eslint eslint-plugin-react eslint-plugin-unused-imports eslint-plugin-prettier eslint-config-prettier
 *   npm install -D @babel/core @babel/preset-react @babel/eslint-parser
 */

module.exports = {
  root: true,

  // ---------- Parser ----------
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,       // dispensa .babelrc separado
    babelOptions: {                 // habilita JSX no Babel parser
      presets: ['@babel/preset-react'],
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },

  // ---------- Ambientes ----------
  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  // ---------- Plugins ----------
  plugins: ['react', 'unused-imports', 'prettier'],

  // ---------- Extensões ----------
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',     // desativa exigência de import React nos arquivos JSX
    'plugin:prettier/recommended',  // integra Prettier e desativa regras conflitantes
  ],

  // ---------- Config React ----------
  settings: {
    react: { version: 'detect' },
  },

  // ---------- Regras customizadas ----------
  rules: {
    // Remove automaticamente imports não usados
    'unused-imports/no-unused-imports': 'error',

    // Exige que o código siga o formato Prettier
    'prettier/prettier': 'error',

    // Desativa regra obsoleta para React 17+
    'react/react-in-jsx-scope': 'off',

    // Desativa prop-types (usar TypeScript para isso em projetos futuros)
    'react/prop-types': 'off',

    // Desativa display-name para componentes memo/forwardRef
    'react/display-name': 'off',

    // Permite blocos catch vazios
    'no-empty': ['error', { allowEmptyCatch: true }],
  },
};
