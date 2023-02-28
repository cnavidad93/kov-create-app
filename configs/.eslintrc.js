module.exports = {
  root: true,
  plugins: ['react'],
  extends: [
    'airbnb-base',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  settings: {
    'import/resolver': {
      'eslint-import-resolver-custom-alias': {
        alias: {
          '@UI': './src/components/UI/',
          '@store': './src/store/',
          '@hooks': './src/hooks/',
          '@utils': './src/helpers/',
          '@components': './src/components/',
        },
        extensions: ['.js', 'jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'no-param-reassign': ['error', { props: false }],
    'no-console': 'off', // We use console in our projects
    'global-require': 'off',
    'react/prop-types': 'off',
    'import/default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-named-as-default': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-unescaped-entities': 'off',
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
  },
};
