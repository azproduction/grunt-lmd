/*
 * grunt-lmd
 *
 * Copyright (c) 2012 Mikhail Davydov
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {
    'use strict';

    var LmdBuilder = require('lmd'),
        // TODO(azproduction) replace lmd/lib/lmd_common with proper name
        getModuleFileByShortName = require('lmd/lib/lmd_common').getModuleFileByShortName,
        LmdWriter = LmdBuilder.Writer,
        Cli = LmdBuilder.Cli.LogWriter,
        fs = require('fs'),
        path = require('path');

    grunt.registerMultiTask('lmd', 'Build a LMD project.', function () {

        var _ = grunt.util._;
        var kindOf = grunt.util.kindOf;
        var done = this.async();
        var data = typeof this.data === "string" ? {build:this.data} : this.data;
        var options = data.options || {};
        var projectRoot = (data.projectRoot || './');
        var lmdDir = path.join(projectRoot, '.lmd');
        var buildName;
        var mixinBuilds = data.build;
        var lmdFile;
        var buildResult;
        var buildConfig;

        _.each(options, function (value, key) {
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
            return getModuleFileByShortName(lmdDir, build);
        });

        if (mixinBuilds.length) {
            options.mixins = mixinBuilds;
        }

        lmdFile = path.join(lmdDir, getModuleFileByShortName(lmdDir, buildName));

        buildResult = new LmdBuilder(lmdFile, options);
        buildConfig = buildResult.buildConfig;

        var output = buildConfig.output;

        if (!output) {
            grunt.fail.warn('LMD failed: output path is not specified');
            done();
            return;
        }

        grunt.file.mkdir(path.dirname(path.join(lmdDir, buildConfig.root, output)));

        var cli = new Cli(process.stdout);
        cli.ok = function (message) {
            grunt.log.ok(message);
        };

        cli.error = function (message) {
            grunt.fail.warn(message);
        };

        cli.warn = function (message) {
            grunt.log.warn(message);
        };

        var cwd = path.join(path.dirname(lmdFile), '..');

        new LmdWriter(buildResult)
            .relativeTo(cwd)
            .logTo(cli)
            .writeAll(function (err) {
                if (err) {
                    grunt.fail.warn('Build failed');
                }
                done();
            });
    });
};

