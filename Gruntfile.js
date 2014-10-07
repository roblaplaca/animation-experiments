'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    // Configurable paths
    var config = {
        app: 'app'
    };

    grunt.initConfig({
        config: config,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: ['<%= config.app %>/scripts/{,*/}*.js'],
                tasks: ['jshint']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            sass: {
                files: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['sass:server']
            },
            styles: {
                files: ['<%= config.app %>/styles/{,*/}*.css'],
                tasks: ['newer:copy:styles']
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            styles: {
                expand: true,
                dot: true,
                cwd: '<%= config.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },

        // The actual grunt server settings
        connect: {
            server: {
                options: {
                    port: 14000,
                    base: '<%= config.app %>',
                }    
            }
        },
        
        // Empties folders to start fresh
        clean: {
            server: '.tmp'
        },

        // Run some tasks in parallel to speed up build process
        concurrent: {
            server: [
                'sass:server',
                'copy:styles'
            ]
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= config.app %>/scripts/{,*/}*.js',
                '!<%= config.app %>/scripts/vendor/*',
            ]
        },

        // Compiles Sass to CSS and generates necessary files if requested
        sass: {
            options: {
                includePaths: [
                    'bower_components'
                ]
            },
            server: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/styles',
                    src: ['*.scss'],
                    dest: '.tmp/styles',
                    ext: '.css'
                }]
            }
        },
    });

    grunt.registerTask('serve', function(target) {
        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'connect:server',
            'watch'
        ]);
    });
};