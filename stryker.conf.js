module.exports = function(config) {
  config.set({
    mutator: 'javascript',
    packageManager: 'npm',
    reporters: ['html', 'clear-text', 'progress', 'dashboard'],
    testRunner: 'mocha',
    transpilers: [],
    testFramework: 'mocha',
    coverageAnalysis: 'perTest',
    mutate: ['handlers/src/**/*.js', 'event-subsystem/src/**/*.js'],
    mochaOptions: {
      files: '**/*.test.js'
    }
  })
}
