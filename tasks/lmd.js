/*
 * grunt-lmd
 *
 * Copyright (c) 2012 Mikhail Davydov
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  'use strict';

  // TODO: ditch this when grunt v0.4 is released
  grunt.util = grunt.util || grunt.utils;

  var LmdBuilder = require('lmd');
  var fs = require('fs');
  var path = require('path');

  var writeTo = function (stream, fileName) {
    var data = '';

    // have to write sync
    stream.on('data', function (chunk) {
      data += chunk;
    });

    stream.on('end', function () {
      fs.writeFileSync(fileName, data, 'utf8');
    });
  };

  grunt.registerMultiTask('lmd', 'Build a LMD project.', function() {

    var _ = grunt.util._;
    var kindOf = grunt.util.kindOf;
    var helpers = require('grunt-lib-contrib').init(grunt);
    var done = this.async();
    var data = typeof this.data === "string" ? {build: this.data} : this.data;
    var options = data.options || {};
    var projectRoot = (data.projectRoot || './');
    var buildName;
    var mixinBuilds = data.build;
    var lmdFile;
    var buildResult;
    var buildConfig;
    var configDir;
    var expectedStreams = 0;
    var tryDoneBuild = function () {
        expectedStreams--;
        if (expectedStreams <= 0) {
            done();
        }
    };

    _.each(options, function(value, key) {
      if (kindOf(value) === 'string') {
        options[key] = grunt.template.process(value);
      }
    });

    grunt.verbose.writeflags(options, 'Options');

    // # Build

    if (mixinBuilds) {
      mixinBuilds = mixinBuilds.split('+');
      buildName = mixinBuilds.shift();
    }

    mixinBuilds = mixinBuilds.map(function (build) {
      return './' + build + '.lmd.json';
    });

    if (mixinBuilds.length) {
      options.mixins = mixinBuilds;
    }

    lmdFile = path.join(projectRoot, '.lmd', buildName + '.lmd.json');

    buildResult = new LmdBuilder(lmdFile, options);
    buildConfig = buildResult.buildConfig;

    if (!buildConfig.output) {
        grunt.fail.warn('LMD failed: output path is not specified');
        tryDoneBuild();
        return;
    }

    if (buildConfig.log && buildConfig.output) {
      grunt.log.ok('Building `' + buildName +  '` (' + lmdFile + ')');
      if (mixinBuilds.length) {
        grunt.log.ok('Extra mixins ' + mixinBuilds);
      }
    }

    configDir = path.join(path.dirname(lmdFile), buildConfig.root || "");

    if (buildConfig.sourcemap) {
      writeTo(buildResult.sourceMap, path.join(configDir, buildConfig.sourcemap));

      if (buildConfig.log && buildConfig.output) {
        buildResult.sourceMap.on('end', function () {
          grunt.log.ok('Writing Source Map to ' + buildConfig.sourcemap.green);
        });
      }
    }

    writeTo(buildResult, path.join(configDir, buildConfig.output));
    if (buildConfig.log) {
      buildResult.log.on('data', function (data) {
        grunt.log.write(data);
      });
      buildResult.on('end', function () {
        grunt.log.ok('Writing LMD Package to ' + buildConfig.output.green);
      });
    }

    if (buildResult.log.readable) {
      expectedStreams++;
      buildResult.log.on('end', tryDoneBuild);
    }

    if (buildResult.readable) {
      expectedStreams++;
      buildResult.on('end', tryDoneBuild);
    }

    if (buildResult.sourceMap.readable) {
      expectedStreams++;
      buildResult.sourceMap.on('end', tryDoneBuild);
    }
  });
};
