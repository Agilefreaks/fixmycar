module.exports = function (config) {
  config.set({
    basePath: './',

    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher'
    ],

    frameworks: ['jasmine'],

    autoWatch: true,
    singleRun: false,
    colors: true,

    browserNoActivityTimeout: 60000,
    browserDisconnectTimeout: 60000,
    browserDisconnectTolerance: 2,

    reporters: ['progress'],

    browsers: ['Chrome'],

    files: [
      '../bower_components/lodash/lodash.js',
      '../bower_components/jquery/dist/jquery.js',
      '../bower_components/backbone/backbone.js',

      '../assets/js/utils/*.js',
      '../assets/js/services/*.js',
      '../assets/js/views/*.js',
      'app/helpers/*.js',
      'app/**/*-spec.js'
    ]
  });
};
