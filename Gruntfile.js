'use strict';

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        less: {
            build: {
                options: {
                    strictMath: true
                },
                expand:  true,
                flatten: true,
                src:    'demo/less/*.less',
                dest:   'demo/tmp/',
                ext:    '.css'
            }
        },
        autoprefixer: {
            options: {
                // browsers: ['> 1%', 'last 2 versions', 'ff 17', 'opera 12.1']
            },
            build: {
                expand:  true,
                flatten: true,
                src:    'demo/tmp/*.css',
                dest:   'demo/css/'
            },
        },
        watch: {
            options: {
                livereload: true,
            },
            css: {
                //options: {
                //    spawn: false
                //},
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
        }
    });
    
    grunt.registerTask('default', ['build']);

    grunt.registerTask('devel', [
        'connect:demo', 
        'watch'
    ]);
    
    grunt.registerTask('build', [
        'less:build',
        'autoprefixer:build'
    ]);
    
    

};
