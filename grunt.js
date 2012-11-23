/*
 * grunt-lmd
 *
 * Copyright (c) 2012 Mikhail Davydov
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    lint: {
      all: ['grunt.js', 'tasks/*.js', '<config:nodeunit.tasks>']
    },

    jshint: {
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
        es5: true
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      test: ['test/test.lmd.js', 'test/test-ru.lmd.js', 'test/extras.lmd.js']
    },

    // Configuration to be run (and then tested).
    lmd: {
      compile: {
        projectRoot: 'test/',
        build: 'test'
      },
      mixin: {
        projectRoot: 'test/',
        build: 'test+ru',
        options: {
          // output is relative to the root dir in LMD build config file
          output: '../test-ru.lmd.js',
          log: true,
          warn: true
        }
      },
      extras: {
        projectRoot: 'test/',
        build: 'test',
        options: {
          ie: false,
          node: false,
          // output is relative to the root dir in LMD build config file
          output: '../extras.lmd.js'
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tasks: ['test/*_test.js']
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // The clean plugin helps in testing.
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Whenever the 'test' task is run, first clean the 'tmp' dir, then run this
  // plugin's task(s), then test the result.
  grunt.renameTask('test', 'nodeunit');
  grunt.registerTask('test', 'clean lmd nodeunit');

  // By default, lint and run all tests.
  grunt.registerTask('default', 'lint test');
};