module.exports = {
  env: {
    browser: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaFeatures: { jsx: true } },
  plugins: [
    'react',
    'react-hooks',
    'sort-keys-fix',
    'sort-imports-es6-autofix',
    '@typescript-eslint',
    'typescript-sort-keys',
    'sort-destructure-keys',
    'no-null'
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true
      }
    ],
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
    '@typescript-eslint/interface-name-prefix': ['off'],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        format: ['camelCase'],
        selector: 'default'
      },
      {
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        selector: 'variable'
      },
      {
        format: ['camelCase', 'PascalCase'],
        selector: 'function'
      },
      {
        format: ['camelCase'],
        leadingUnderscore: 'allow',
        selector: 'parameter'
      },
      {
        format: ['camelCase'],
        leadingUnderscore: 'allow',
        selector: 'property'
      },
      {
        format: ['camelCase'],
        leadingUnderscore: 'allow',
        selector: 'method'
      },
      {
        format: ['camelCase'],
        leadingUnderscore: 'require',
        modifiers: ['private'],
        selector: 'memberLike'
      },
      {
        format: ['PascalCase'],
        selector: 'typeLike'
      }
    ],
    // For now, explicit any is better than implicit any
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/no-namespace': ['error', { allowDeclarations: true }],
    '@typescript-eslint/no-non-null-assertion': ['off'],
    '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
    'arrow-parens': ['error', 'as-needed', { requireForBlockBody: false }],
    'comma-dangle': ['error', 'never'],
    'no-null/no-null': 2,
    'eol-last': ['error', 'always'],
    'jsx-quotes': ['error', 'prefer-double'],
    'max-classes-per-file': ['off'],
    // max-len allows for exceptions.
    // Strings, template literals, urls, reg exps can all be ignored.
    'max-len': [
      'error',
      {
        code: 180,
        comments: 180
      }
    ],
    'no-bitwise': ['off'],
    // A rule that was previously turned off,
    // but with prettier this sorts your keys automatically,
    // and helps with readability and findability
    // of our codebase
    'no-multiple-empty-lines': ['warn', { max: 2 }],
    'object-property-newline': ['error', { allowAllPropertiesOnSameLine: false }],
    'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
    'quote-props': ['error', 'as-needed'],
    quotes: [
      'error',
      'single',
      {
        allowTemplateLiterals: true,
        avoidEscape: true
      }
    ],
    'react-hooks/rules-of-hooks': 'error',
    semi: ['error', 'never'],
    'sort-destructure-keys/sort-destructure-keys': ['error', { caseSensitive: false }],
    'sort-imports-es6-autofix/sort-imports-es6': ['error'],
    'sort-keys-fix/sort-keys-fix': [
      'error',
      'asc',
      {
        caseSensitive: true,
        natural: true
      }
    ],
    'typescript-sort-keys/interface': ['error']
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
