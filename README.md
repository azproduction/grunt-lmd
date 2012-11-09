# grunt-contrib-lmd [![Build Status](https://secure.travis-ci.org/azproduction/grunt-contrib-lmd.png?branch=master)](http://travis-ci.org/azproduction/grunt-contrib-lmd)

> Assemble LMD projects.

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-contrib-lmd`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-contrib-lmd');
```

[grunt]: https://github.com/gruntjs/grunt
[getting_started]: https://github.com/gruntjs/grunt/blob/master/docs/getting_started.md

### Overview

Inside your `grunt.js` file add a section named `lmd`. This section specifies LMD build configuration.

#### Parameters

##### options ```[object]```

This controls how this task (and its helpers) operate and should contain key:value pairs, see options below.

##### projectRoot ```[string]```

Relative path to the project root

##### build ```string```

LMD build name

#### Options

For a full list of possible options, [see LMD project documentation](https://github.com/azproduction/lmd).

#### Config Example

``` javascript
lmd: {
  build_name: {
   projectRoot: 'test/',
   build: 'test'
  }
}
```

``` javascript
// project root is current
// with mixins
lmd: {
  build_name: 'test+ru'
}
```