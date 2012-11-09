var grunt = require('grunt');

exports['lmd'] = {
  test: function(test) {
    'use strict';

    var result;

    test.expect(1);

    // check for ie:true
    result = grunt.file.read('test/test.lmd.js').indexOf('=this.length;t-->0;)') !== -1;
    test.ok(result, 'should build LMD package.');

    test.done();
  },

  'test-ru': function(test) {
    'use strict';

    var result;

    test.expect(1);

    result = grunt.file.read('test/test-ru.lmd.js').indexOf('i18n:{hi:"Hi"}') !== -1;
    test.ok(result, 'should build LMD package with mixins.');

    test.done();
  },

  extras: function(test) {
    'use strict';

    var expect, result;

    test.expect(1);

    expect = '(function(e,t,n,r){var i={},s=function(t){return e.Function("return "+t)()},o,u=function(t,s){null;var u={exports:{}};i[t]=1,n[t]=u.exports;if(!s)s=e[t];else if(typeof s=="function"){var f=[t,a][1];r[t]&&r[t].sandbox&&typeof f=="function"&&(f=o),s=s(f,u.exports,u)||u.exports}return s=[t,s][1],n[t]=s},a=function(e){var t=n[e];null;if(i[e]&&t)return t;var r=[e,t];return r&&(e=r[0],t=r[1]),null,typeof t=="string"&&t.indexOf("(function(")===0&&(t=s(t)),u(e,t)},f={exports:{}};for(var l in n)i[l]=0;t(["main",a][1],f.exports,f)})(this,function(){},{hello:function(){return"hello"},world:function(){return"world"}},{})';
    result = grunt.file.read('test/extras.lmd.js');
    test.equal(expect, result, 'should build LMD package with extra options.');

    test.done();
  }
};