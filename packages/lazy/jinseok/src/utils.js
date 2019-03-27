export function of(iteratee, collection) {
  for (const item of collection) {
    iteratee(item);
  }
};

export function map(iteratee, collection) {
  const result = [];
  of(item => result.push(iteratee(item)), collection);
  return result;
};

export function filter(iteratee, collection) {
  const result = [];
  of(item => {
    if(iteratee(item)) result.push(item);
  }, collection);
  return result;
};

export function reduce(iteratee, collection, accumulator) {
  let result = accumulator;
  let iterator = collection;

  if (result == undefined) {
    iterator = collection[Symbol.iterator]();
    result = iterator.next().value;
  }

  of (item => result = iteratee(result, item), iterator);

  return result;
};

export function go(...args) {
  return reduce((accumulator, func) => func(accumulator), args);
};

export function pipe(head, ...funcs) {
  return (...args) => go(head(...args), ...funcs);
};

export function curry(func) {
  return (head, ...args) => args.length
    ? func(head, ...args)
    : (...args) => func(head, ...args);
};
