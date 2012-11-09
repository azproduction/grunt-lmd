```js
lmd: {
  // If .lmd is located in the same path as grunt.js
  test: 'test',
  test_ru: 'test+ru',

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
}
```