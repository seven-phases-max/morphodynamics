'use strict';

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        less: {
            options: {
                strictMath: true,
                // cleancss: true
            },
            build: {
                expand:   true,
                flatten:  true,
                src:     'demo/less/*.less',
                dest:    'demo/css/',
                ext:     '.css'
            }
        },
        cssmin: {
            options: {
                keepSpecialComments: 1,
                noRebase: true
            },
            build: {
                expand:   true,
                flatten:  true,
                src:     'demo/css/*.css',
                dest:    'demo/css/',
                ext:     '.min.css'
            }
        },
        csscomb: {
            build: {
                options: {
                    config: 'build/csscomb.json'
                },
                expand:   true,
                flatten:  true,
                src:     'demo/css/*.min.css',
                dest:    'demo/css/',
                ext:     '.css'
            }
        },
        autoprefixer: {
            options: {
                // browsers: ['> 1%', 'last 2 versions', 'ff 17', 'opera 12.1']
            },
            build: {
                expand:   true,
                flatten:  true,
                src:     'demo/css/*.css',
                dest:    'demo/css/'
            },
        },
        watch: {
            options: {
                livereload: true,
            },
            css: {
                files: ['demo/less/*.less', 'src/**/*.less'],
                tasks: ['build']
            }
        },
        connect: {
            options: {
                port: 9001,
            },
            demo: {
                options: {
                    base:     ['demo'],
                    livereload: true
                }
            }
        },
        copy: {
            options: {
            },
            ghpages: {
                expand:   true,
                cwd:     'demo/',
                src:    ['**', '!**/~*', '!**/*.less'],
                dest:    '_gh_pages/',
                // filter:  'isFile'
            }
        },
        clean: {
            // options: {'no-write': true},
            build:   ['demo/css'],
            ghpages: {
                expand:   true,
                cwd:     '_gh_pages/',
                src:    ['**/*', '!.git']
            },
        }
    });
    
    grunt.registerTask('default', ['build']);

    grunt.registerTask('devel', [
        'connect:demo', 
        'watch'
    ]);
    
    grunt.registerTask('build', [
        'clean:build',
        'less:build',
        'cssmin:build',
        'csscomb:build',
        'autoprefixer:build'
    ]);
    
    grunt.registerTask('ghpages', [
        'build',
        'clean:ghpages', 
        'copy:ghpages'
    ]);
};
