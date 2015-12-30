module.exports = function (config) {
  config.set({
    basePath: '../',

    plugins: [
      'karma-jasmine',
      'karma-ejs-preprocessor',
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

    preprocessors: {
      '**/*.ejs': ['ejs']
    },

    ejsOptions: {
      parentPath: 'assets/templates'
    },

    files: [
      'assets/templates/**/*.ejs',

      'bower_components/lodash/lodash.js',
      'bower_components/jquery/dist/jquery.js',
      'bower_components/backbone/backbone.js',
      
      'node_modules/sinon/pkg/sinon.js',

      'assets/js/utils/*.js',
      'assets/js/services/*.js',
      'assets/js/models/*.js',
      'assets/js/collections/*.js',
      'assets/js/views/*.js',

      'specs/app/helpers/*.js',
      'specs/app/**/*-spec.js'
    ]
  });
};
