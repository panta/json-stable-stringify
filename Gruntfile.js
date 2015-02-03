'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		clean: ['index.js', 'json_stable_stringify.min.js', 'bower.json', 'component.json'],

		concat: {
			dist: {
		      src: ['src/umd-prefix.js','src/stringify.js','src/umd-postfix.js'],
		      dest: 'json_stable_stringify.js',
		  }
		},

		copy: {
			main: {
				src: 'json_stable_stringify.js',
				dest: 'index.js'
			},
		},

		uglify: {
			options: {
				mangle: {
					except: ['JSON_stable_stringify']
				}
			},
			dist: {
				src: 'json_stable_stringify.js',
				dest: 'json_stable_stringify.min.js'
			}
		},

		update_json: {
			bower: {
				src: 'package.json',
				dest: 'bower.json',
				fields: [
					'name',
					'version',
					'main',
					'ignore',
					'dependencies',
					'devDependencies',
					'keywords',
					'license',
					'authors',
					'homepage',
					'repository',
				]
			},
			component: {
				src: 'package.json',
				dest: 'component.json',
				fields: {
					'name'			: null,
					'repository'	: 'repo',
					'description'	: null,
					'version'		: null,
					'keywords'		: null,
					'main'			: null,
					'dependencies'	: null,
					'development'	: 'devDependencies',
					'license'		: null,
				}
			}
		}
	});

	grunt.registerTask('default', ['concat', 'copy', 'uglify', 'update_json']);
	grunt.registerTask('fresh', ['clean', 'default']);
};
