module.exports = {
  extends: ['@commitlint/config-conventional'],

  rules: {
    'type-enum': [2, 'always', ['build', 'feat', 'fix', 'refactor', 'release', 'style','docs','test', 'chore', 'ci']],
    'scope-enum': [2, 'always', ['ngx-onesignal', 'sandbox']]
  }
};
