module.exports = function(grunt) {
  grunt.config.set('karma', {
    app: {
      configFile: 'specs/app.conf.js',
      autoWatch: true
    }
  });

  grunt.loadNpmTasks('grunt-karma');
};
