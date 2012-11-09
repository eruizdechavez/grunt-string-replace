var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

var Replacement = function(pattern, replacement) {
    return {
      pattern: pattern || '',
      replacement: replacement || ''
    };
  };

exports['string-replace'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'detect-dest-type': function(test) {
    test.expect(2);

    var file = 'foo.txt';
    var directory = 'tasks/';

    test.equal(grunt.helper('detect-dest-type', file), 'file', 'should be file');
    test.equal(grunt.helper('detect-dest-type', directory), 'directory', 'should be directory');

    test.done();
  },
  'normalize-replacements': function(test) {
    test.expect(2);

    var _ = grunt.util._,
      replacements = [];

    _(10).times(function() {
      replacements.push(new Replacement());
    });

    var normalized = grunt.helper('normalize-replacements', replacements);
    test.equal(_.isArray(normalized), true, 'normalized should be an array');

    var total = normalized.reduce(function(subtotal, item) {
      return subtotal + item.length;
    }, 0);
    test.equal(total, 20, 'normalized should have n * 2 items');

    test.done();
  },
  'str-replace': function(test) {
    test.expect(2);
    test.equal(grunt.helper('str-replace', 'Hello ASDF', 'ASDF', 'World'), 'Hello World', 'should replace a string');
    test.equal(grunt.helper('str-replace', 'Hello ASDF', /asdf/i, 'World'), 'Hello World', 'should replace a regex');
    test.done();
  },
  'multi-str-replace': function(test) {
    test.expect(1);
    test.equal(grunt.helper('multi-str-replace', 'ASDF QWER', [['ASDF', 'Hello'], [/qwer/i, 'World']]), 'Hello World', 'should replace a set of replacements');
    test.done();
  },
  'string-replace': function(test) {
    test.expect(1);

    var files = [{
      dest: 'test/baz.txt',
      src: 'test/foo.txt'
    }];

    var replacements = [
      ['[test:string]','replaced!'],
      [/\[test a:regex \d{3,}\]/, 'replaced!'],
      [/\[test b:regex \d{3,}\]/g, 'replaced!'],
      [/\[test c:regex \d{3,}\]/g, 'replaced!'],
      [/\[test d:regex \d{3,}\]/ig, 'replaced!'],
    ];

    grunt.helper('string-replace', files, replacements);

    var actual = grunt.file.read('test/baz.txt'),
      expected = grunt.file.read('test/bar.txt');

    test.equal(actual, expected, 'should execute replacements and save a new file');
    test.done();
  }
};
