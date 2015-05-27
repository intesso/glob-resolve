var test = require('tape');
var equal = require('object-equal');
var resolve = require('../index');

test('do async', function(t) {

  var src = __dirname + '/fixtures/:module/public/**';
  var dest = __dirname + '/public/:module/**';
  resolve(src, dest, function(err, result) {

    t.ok(result.src);
    t.ok(result.dest);

    t.equal(result.src.globstars, 1);
    t.equal(result.dest.globstars, 1);

    t.equal(result.src.paths.length, 14);
    t.equal(result.dest.paths.length, 14);

    t.equal(result.src.values.length, 14);
    t.equal(result.dest.values.length, 14);


    t.equal(result.src.values[0][':module'], 'Irish-Pub');
    t.equal(result.src.values[0]['**'], '');

    t.equal(result.src.vars.length, 2);

    result.src.vars[0].index = undefined;
    t.ok(equal(result.src.vars[0], {
        segment: ':module',
        compiled: '*',
        type: 'named',
        name: 'module',
        globstar: false,
        index: undefined
      })
    );

    result.src.vars[1].index = undefined;
    t.ok(equal(result.src.vars[1], {
        segment: '**',
        compiled: '**',
        type: 'unnamed',
        name: '**',
        globstar: true,
        index: undefined
      })
    );

    t.end(err);
  });
});

test('do sync', function(t) {
  var result = resolve.sync('fixtures/:module/public', 'public/:module');

  t.ok(result.src);
  t.ok(result.dest);

  t.equal(result.src.globstars, 0);
  t.equal(result.dest.globstars, 0);

  t.equal(result.src.paths.length, 2);
  t.equal(result.dest.paths.length, 2);

  t.equal(result.src.values.length, 2);
  t.equal(result.dest.values.length, 2);
  t.equal(result.src.values[0][':module'], 'Irish-Pub');
  t.equal(result.src.values[1][':module'], 'test_pub');

  t.equal(result.dest.vars.length, 1);
  result.dest.vars[0].index = undefined;
  t.ok(equal(result.dest.vars[0], {
      segment: ':module',
      compiled: '*',
      type: 'named',
      name: 'module',
      globstar: false,
      index: undefined
    })
  );

  t.ok(equal(result.src.paths, ['fixtures/Irish-Pub/public', 'fixtures/test_pub/public']));
  t.ok(equal(result.dest.paths, ['public/Irish-Pub', 'public/test_pub']));

  t.end();

});

test('do sync not existing', function(t) {
  var result = resolve.sync('fixtures-not-here/:module/public', 'public/:module');

  t.ok(result.src);
  t.ok(result.dest);

  t.equal(result.src.globstars, 0);
  t.equal(result.dest.globstars, 0);

  t.equal(result.src.paths.length, 0);
  t.equal(result.dest.paths.length, 0);

  t.equal(result.src.values.length, 0);
  t.equal(result.dest.values.length, 0);

  t.equal(result.dest.vars.length, 1);
  result.dest.vars[0].index = undefined;
  t.ok(equal(result.dest.vars[0], {
      segment: ':module',
      compiled: '*',
      type: 'named',
      name: 'module',
      globstar: false,
      index: undefined
    })
  );

  t.end();

});
