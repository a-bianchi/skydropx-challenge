module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'prettier'],
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
	parserOptions: {
	  project: ['./tsconfig.spec.json'],
	},
	env: {
	  node: true,
	},
	rules: {
	  '@typescript-eslint/explicit-module-boundary-types': 'error',
	  '@typescript-eslint/explicit-function-return-type': 'error',
	  '@typescript-eslint/no-floating-promises': 'error',
	  '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
	  '@typescript-eslint/camelcase': 0,
	  '@typescript-eslint/member-delimiter-style': [
	    'error',
	    {
	      multiline: {
		delimiter: 'semi',
		requireLast: true,
	      },
	      singleline: {
		delimiter: 'semi',
		requireLast: false,
	      },
	    },
	  ],
	},
      };
      