var grunt = require('grunt');

exports['lmd'] = {
    test: function (test) {
        'use strict';

        var result;

        test.expect(1);

        // check for ie:true
        result = grunt.file.read('test/test.lmd.js').indexOf('=this.length;t-->0;)') !== -1;
        test.ok(result, 'should build LMD package.');

        test.done();
    },

    'test-ru': function (test) {
        'use strict';

        var result;

        test.expect(1);

        result = grunt.file.read('test/test-ru.lmd.js').indexOf('i18n:{hi:"Hi"}') !== -1;
        test.ok(result, 'should build LMD package with mixins.');

        test.done();
    },

    'test-js': function (test) {
        'use strict';

        var result;

        test.expect(1);

        // check for ie:true
        result = grunt.file.read('test/test-js.lmd.js').indexOf('=this.length;t-->0;)') !== -1;
        test.ok(result, 'should build .js LMD package.');

        test.done();
    },

    'test-js-ru-js': function (test) {
        'use strict';

        var result;

        test.expect(1);

        result = grunt.file.read('test/test-js-ru-js.lmd.js').indexOf('i18n:{hi:"Hi"}') !== -1;
        test.ok(result, 'should build .js LMD package with .js mixins.');

        test.done();
    },

    extras: function (test) {
        'use strict';

        var result;

        test.expect(1);

        result = grunt.file.read('test/extras.lmd.js').indexOf('/[\u0000-\u001f"\\\u007f-\uffff]/g') === -1;
        test.ok(result, 'should build LMD package with extra options.');

        test.done();
    }
};