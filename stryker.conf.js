module.exports = function(config) {
  config.set({
    mutator: 'javascript',
    packageManager: 'npm',
    reporters: ['html', 'clear-text', 'progress', 'dashboard'],
    testRunner: 'mocha',
    transpilers: [],
    testFramework: 'mocha',
    coverageAnalysis: 'perTest',
    mutate: ['src/**/*.js', 'handlers/**/*.js', 'event-subsystem/**/*.js'],
    mochaOptions: {
      files: '**/*.test.js'
    }
  })
}
