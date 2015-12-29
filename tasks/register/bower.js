module.exports = function(grunt) {
  grunt.config.set('bower', {
    dev: {
      dest: '.tmp/public',
      js_dest: '.tmp/public/js/bower_components',
      css_dest: '.tmp/public/styles/bower_components'
    }
  });

  grunt.loadNpmTasks('grunt-bower');
};
