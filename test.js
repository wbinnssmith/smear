var test = require('blue-tape');
var smear = require('./');

test('with a real Promise', function (t) {
  return Promise.resolve([1, 2, 3]).then(smear(function (one, two, three) {
    t.equal(one, 1);
    t.equal(two, 2);
    t.equal(three, 3);
  }));
});

test('throws if parameter is something other than an array', function (t) {
  t.plan(1);

  Promise.resolve(5)
    .then(smear(function (one, two, three) {}))
    .catch(function (e) {
      if (e.message.match(/smear/)) {
        t.pass();
      }
    });
});

test('throws if extraneous arguments', function (t) {
  t.plan(1);

  function foo (fn) {
    fn([1, 2, 3], 5);
  }

  try {
    foo(smear(function (one, two, three) {}));
  } catch (e) {
    if (e.message.match(/smear/)) {
      t.pass();
    }
  }
});

test('passes through the context', function (t) {
  t.plan(4);

  var x = {
    foo: function (fn) {
      fn.call(this, [5, 6, 7]);
    }
  };

  x.foo(smear(function (five, six, seven) {
    t.equal(this, x);
    t.equal(five, 5);
    t.equal(six, 6);
    t.equal(seven, 7);
  }));
});
