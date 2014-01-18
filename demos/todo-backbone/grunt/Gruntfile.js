/*
 * grunt-lmd
 *
 * Copyright (c) 2012 Mikhail Davydov
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {
    'use strict';
    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: ['Gruntfile.js','tasks/*.js'],
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                node: true,
                es5: false
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            options: {
                force: true
            },
            pre: [
            '../output/**',
            ],
            post: [
            '../production/compiled/**',
            ]
        },

        // Configuration to be run (and then tested).
        lmd:  {
            compile:  {
                projectRoot:  '../src/',
                build: 'dev',
                options: {
                    output: '../../output/dev.lmd.js'
                }
            },
/*            mixin:  {
                projectRoot:  '../src/',
                build: 'dev+test',
                options: {
                    // output is relative to the root dir in LMD build config file
                    output: '../../output/dev-test.lmd.js',
                    log: true,
                    warn: true
                }
            }, */
            
        },
        copy: {
            main: {
                files: [                     
                    {expand: true, flatten: true, src: '../output/**', dest: '../production/compiled/', filter: 'isFile'},
                ]
            }
        },
        watch: {
            scripts: {
                files: ["../src/**"],
                tasks: ["prod"]
            }
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // The clean plugin helps in testing.
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // grunt.loadNpmTasks('grunt-contrib-jasmine');

    // Whenever the 'test' task is run, first clean the 'tmp' dir, then run this
    // plugin's task(s), then test the result.

    // grunt.registerTask('test', ['clean:pre', 'lmd', 'jasmine']);

    grunt.registerTask('prod', ['jshint', 'clean:pre', 'lmd', 'clean:post', 'copy']);

};
