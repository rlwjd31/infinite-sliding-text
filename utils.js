const curry =
  (f) =>
  (a, ..._) =>
    _.length ? f(a, ..._) : (..._) => f(a, ..._);
const reduce = curry((cb, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }

  for (const cur of iter) {
    acc = cb(acc, cur);
  }

  return acc;
});
const go = (...funcs) => reduce((acc, cur) => cur(acc), funcs);
const map = curry((cb, iter) => {
  const result = [];
  let index = 0;

  for (const a of iter) {
    result.push(cb(a, index++));
  }

  return result;
});

const forEach = curry((cb, iter) => {
  let index = 0;

  for (const v of iter) {
    cb(v, index++);
  }
});

export { curry, go, map, forEach, reduce };
