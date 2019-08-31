export function compare(property) {
  return function(obj1, obj2) {
    const value1 = obj1[property];
    const value2 = obj2[property];
    if (value1 > value2) {
      return 1;
    } else if (value1 < value2) {
      return -1;
    } else {
      return 0;
    }
  };
}
