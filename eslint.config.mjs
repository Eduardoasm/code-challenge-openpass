import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    rules: {
      'quotes': ['warn', 'single'],
      'semi': ['warn', 'always']
    }
  },
  // {
  //   files: ['**/*.js'],
  //   languageOptions: { sourceType: 'script' },
  //   rules: {
  //     'quotes': ['error', 'single'],
  //     'semi': ['error', 'always']
  //   }
  // },
  {
    languageOptions: { globals: globals.node }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
