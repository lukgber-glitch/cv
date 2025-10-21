// ESLint configuration for vue-cv
module.exports = {
  root: true,
  env: { browser: true, es2021: true, node: true },
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    // Allow single-word component names for this portfolio project
    'vue/multi-word-component-names': 'off'
  }
}
