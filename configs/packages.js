export const DEFAULT_PACKAGES = {
  dependencies: {
    react: '^18.2.0',
    'react-dom': '^18.2.0',
  },
  devDependencies: {
    '@vitejs/plugin-react-swc': '^3.0.0',
    eslint: '^8.33.0',
    'eslint-config-airbnb-base': '^15.0.0',
    'eslint-config-prettier': '^8.6.0',
    'eslint-import-resolver-custom-alias': '^1.3.0',
    'eslint-plugin-import': '^2.27.5',
    'eslint-plugin-prettier': '^4.2.1',
    'eslint-plugin-react': '^7.32.2',
    'eslint-plugin-react-hooks': '^4.6.0',
    prettier: '^2.8.3',
    sass: '^1.58.0',
    vite: '^4.1.0',
  },
};

export const TYPESCRIPT_PACKAGES = {
  dependencies: {},
  devDependencies: {
    '@types/react': '^18.0.27',
    '@types/react-dom': '^18.0.10',
    typescript: '^4.9.3',
  },
};

export const REDUX_PACKAGES = {
  dependencies: {
    '@reduxjs/toolkit': '^1.9.2',
    'react-redux': '^8.0.5',
    'redux-saga': '^1.2.2',
  },
  devDependencies: {},
};

export const KOV_SHARED_PACKAGES = {
  dependencies: {
    '@kathondvla/react-shared-components':
      'git+ssh://git@bitbucket.org/vskovzw/kathondvla-react-shared-components.git#0.2.20',
  },
  devDependencies: {},
};
