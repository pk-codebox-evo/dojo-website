/* jshint node: true */
var path = require('path');
var marked = require('marked');

module.exports = function (grunt) {

	// Build config variables
	var config = require('./config.js')(grunt);

	// Reads and parses the roadmap json
	var roadmap = require('./tasks/roadmap.js')(grunt);


	var ejsOptions = {
		dojo: config.dojo,
		url: config.urls,
		rev: Date.now(),
		roadmap: roadmap
	};


	grunt.initConfig({
		// This is a custom task that compiles markdown tutorials
		// in `src` and moves them to `dest`, running each through the
		// specified ejs `template`. Within the template, two variables
		// are made available: `content`, which is the resulting tutorial
		// HTML, and `tutorials`, which is an array all tutorials represented
		// as objects, each with a `filename` and `title` property.
		config: config,

		tutorials: {
			all: {
				options: ejsOptions,
				src: '<%= config.src %>/documentation/tutorials/',
				dest: '<%= config.dest %>/documentation/tutorials/',
				template: '<%= config.src %>/_templates/tutorial.ejs',
				indexTemplate: '<%= config.src %>/documentation/index.ejs',
				indexDest: '<%= config.dest %>/documentation/'
			}
		},

		// Compile the Reference Guide and API docs
		exec: {
			guide: {
				cwd: '<%= config.src %>/documentation/reference-guide',
				cmd: 'sphinx-build -b html -a -c ./ ./1.10 ../../../<%= config.dest %>/reference-guide/1.10'
			},
			guide19: {
				cwd: '<%= config.src %>/documentation/reference-guide',
				cmd: 'sphinx-build -b html -a -c ./ ./1.9/ ../../../<%= config.dest %>/reference-guide/1.9'
			},
			guide18: {
				cwd: '<%= config.src %>/documentation/reference-guide',
				cmd: 'sphinx-build -b html -a -c ./ ./1.8/ ../../../<%= config.dest %>/reference-guide/1.8'
			},
			guide17: {
				cwd: '<%= config.src %>/documentation/reference-guide',
				cmd: 'sphinx-build -b html -a -c ./ ./1.7/ ../../../<%= config.dest %>/reference-guide/1.7'
			},
		},

		spawn: {
			api: {
				command: "node",
				commandArgs: ["build"],
				directory: "tasks/api",
				opts: {
					cwd: __dirname + '/tasks/api'
        		},
				useQuotes: true,
				quoteDelimiter: "\"",
				groupFiles: true,
				passThrough: true
			},
		},

		ejs: {
			all: {
				options: ejsOptions,
				cwd: config.src,
				src: ['index.ejs', 'community/**/*.ejs', 'download/**/*.ejs'],
				dest: config.dest,
				expand: true,
				ext: '.html'
			},

			//Docs need to have partials compiled to HTML first
			docs: {
				options: ejsOptions,
				cwd: '<%= config.src %>/_partials',
				src: ['header.ejs', 'footer.ejs'],
				dest: '<%= config.src %>/_partials/tmp',
				expand: true,
				ext: '.html'
			}
		},

		highlight: {
		    task: {
		      options: {},
		      files: {'<%= config.dest %>/download/index.html':['<%= config.dest %>/download/index.html']}
			}
		},

		stylus: {
			compile: {
		    	options: {
					'include css': true,
					compress:true,
				},
				files: {
					'<%= config.dest %>/css/index.css': '<%= config.src %>/css/index.styl',
					'<%= config.dest %>/css/api.css': '<%= config.src %>/css/views/api.styl',
					'<%= config.dest %>/css/guide.css': '<%= config.src %>/css/views/guide.styl',
					'<%= config.dest %>/blog/wp-content/themes/dtk/style.css' : '<%= config.src %>/css/views/blog.styl'
				}
			},
		},

		cssmin: {
		  target: {
		    files: [{
		      expand: true,
		      cwd: '<%= config.dest %>/css',
		      src: ['*.css'],
		      dest: '<%= config.dest %>/css',
		      ext: '.css'
		    }],
		    verbose: true
		  },
		},

		connect: {
			server: {
				options: {
					port: 1337,
					base: config.dest
				}
			}
		},

		sync: {
			images: {
				files: [{
					cwd: config.src,
					src: ['images/**', 'css/images/**', 'css/fonts/**'],
					dest: config.dest,
					expand: true,
				}],
				verbose: true
			},
			scripts: {
				files: [{
					cwd: config.src,
					src: ['scripts/**', '!scripts/dojo/**/*'],
					dest: config.dest,
					expand: true,
				}],
				verbose: true
			},
			dojo: {
				files: [{
					cwd: '<%=config.src %>/scripts/dojo/release',
					src: ['**/*', '!build-report.txt'],
					dest: '<%=config.dest %>/scripts/dojo',
					expand: true,
				}],
				verbose: true
			},
			css: {
				files: [
					{
						cwd: '<%=config.src%>/css/fonts/icomoon_icons/fonts',
						src: ['*'],
						dest: '<%=config.dest%>/css/fonts',
						expand: true,
					},
					{
						cwd: '<%=config.src%>/css/fonts/icomoon_trusted/fonts',
						src: ['*'],
						dest: '<%=config.dest%>/css/fonts',
						expand: true,
					},
				],
				verbose: true
			},
			blog: {
				files: [
					{
						cwd: '<%= config.src %>/blog',
						src: ['dtk/**/*'],
						dest: '<%= config.dest %>/blog/wp-content/themes/',
						expand: true,
					},
					{
						cwd: '<%= config.src %>/_partials/tmp',
						src: ['header.html', 'footer.html'],
						dest: '<%= config.dest %>/blog/wp-content/themes/dtk/inc'
					},
					{
						cwd: '<%=config.src %>/scripts/dojo/release',
						src: ['dojo/**/*','dtk/**/*', '!build-report.txt'],
						dest: '<%= config.dest %>/blog/wp-content/themes/dtk/js/dojo'
					},
					{
						cwd: '<%= config.src %>/css',
						src: ['fonts/**/*'],
						dest: '<%= config.dest %>/blog/wp-content/themes/dtk/css'
					},
					{
						cwd: '<%=config.src%>/css/fonts/icomoon_icons/fonts',
						src: ['*'],
						dest: '<%= config.dest %>/blog/wp-content/themes/dtk/fonts',
						expand: true,
					}
				],
				verbose: true
			}
		},

		watch: {
			ejs: {
				files: ['<%= config.src %>/**/*.ejs', '<%= config.src %>/community/roadmap/packages.json','!<%= config.src %>/documentation/**/*', '!<%= config.src %>/scripts/**/*', '!<%= config.src %>/images/**/*'],
				tasks: ['ejs', 'highlight']
			},

			tutorials: {
				files: ['<%= config.src %>/documentation/tutorials/**/*.md', '<%= config.src %>/documentation/index.ejs', '<%= config.src %>/_templates/tutorial.ejs', '!<%= config.src %>/**/README.md'],
				tasks: ['tutorials']
			},
			blog: {
				files: ['<%= config.src %>/blog/dtk/**/*', '<%= config.src %>_partials/**/*.ejs'],
				tasks: ['sync:blog']
			},
			stylus: {
				files: ['<%= config.src %>/**/*.styl', '!<%= config.src %>/vendor/**'],
				tasks: ['css']
			},
			js: {
				files: ['<%= config.src %>/scripts/**/*.js', '<%= config.src %>/scripts/*.js', '!<%= config.src %>/scripts/dojo/**', '!<%= config.src %>/scripts/syntaxhighlighter/**'],
				tasks: ['sync:scripts']
			}
		},

		clean: {
			dist: {
				src: ['<%=config.dest%>/*','!<%=config.dest%>/blog/**']
			}
		}
});

	grunt.loadNpmTasks('grunt-ejs');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-sync');
	grunt.loadNpmTasks('grunt-highlight');
	grunt.loadNpmTasks('grunt-spawn');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadTasks('tasks');

	grunt.registerTask('docs',['ejs:docs', 'exec', 'spawn']);
	grunt.registerTask('up', ['css', 'sync', 'ejs', 'tutorials', 'highlight']);
	grunt.registerTask('css', ['stylus', 'cssmin', 'sync:css']);

	grunt.registerTask('delete', ['clean:dist'])
	grunt.registerTask('deploy', ['delete', 'css', 'sync', 'ejs', 'tutorials', 'highlight', 'docs']);
	grunt.registerTask('default', ['delete', 'css', 'sync', 'ejs', 'tutorials', 'highlight']);
	grunt.registerTask('develop', ['css', 'ejs', 'sync', 'highlight', 'tutorials', 'connect', 'watch']);

};
