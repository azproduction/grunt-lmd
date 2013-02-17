# grunt-lmd [![Build Status](https://secure.travis-ci.org/azproduction/grunt-lmd.png?branch=master)](http://travis-ci.org/azproduction/grunt-lmd)

Build LMD projects.

## Migration from grunt 0.3 to 0.4

 - grunt-lmd >= 0.1.6 works with grunt 0.4
 - grunt-lmd <= 0.1.5 works with grunt 0.3

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-lmd`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-lmd');
```

[grunt]: https://github.com/gruntjs/grunt
[getting_started]: https://github.com/gruntjs/grunt/wiki/Getting-started

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