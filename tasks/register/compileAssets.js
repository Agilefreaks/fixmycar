module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		'clean:dev',
		'bower:dev',
		'less:dev',
		'copy:dev',
    'jst:dev',
		'coffee:dev'
	]);
};
