module.exports = function smear (fn) {
  return function () {
    if (arguments.length === 1 && arguments[0] && arguments[0].length) {
      return fn.apply(this, arguments[0]);
    } else {
      throw new Error('smear: expected an array as a lone parameter to spread!');
    }
  };
};
