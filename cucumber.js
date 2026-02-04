module.exports = {
  default: {
    require: ['steps/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: ['progress', 'html:reports/cucumber-report.html', 'json:reports/cucumber-report.json'],
    parallel: 2,
    formatOptions: {
      snippetInterface: 'async-await'
    }
  }
};
