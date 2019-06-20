/**
 * @param {Function} decorator
 * @returns {Function}
 */
module.exports = function decorateWithOptions(decorator) {
  if (typeof decorator !== 'function') {
    throw new TypeError(`Decorator must be a function. Received: ${decorator}`);
  }

  /**
   * @param {...*|Function} args
   * @returns {*|Function}
   */
  return function decoratorWithOptions(...args) {
    const argsLength = args.length;

    if (argsLength > 0) {
      const firstArg = args[0];
      const lastArg = args[argsLength - 1];

      // If used as:
      // @decorator
      // decorator(classOrFunction[, option1, option2, ..., optionN])
      if (isClassOrFunction(firstArg)) {
        return decorator(...args);
        // If used as:
        // decorator(option1[, option2, ..., optionN], classOrFunction)
      } else if (isClassOrFunction(lastArg)) {
        args.pop();

        return decorator(lastArg, ...args);
      }
    }

    /**
     * If used as:
     * @decorator([option1, option2, ..., optionN])
     * decorator([option1, option2, ..., optionN])(classOrFunction)
     *
     * @param {Function} classOrFunction
     */
    return function decoratorWrapper(classOrFunction) {
      return decorator(classOrFunction, ...args);
    };
  };
};

/**
 * @param {*} value
 * @returns {boolean}
 */
function isClassOrFunction(value) {
  return (typeof value === 'function');
}
