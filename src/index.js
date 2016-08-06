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
    const firstArg = args[0];
    const lastArg = args[argsLength - 1];

    // If used as:
    // @decorator
    // decorator(ClassOrFunction)
    // decorator(ClassOrFunction, option1, option2, ..., optionN)
    if (isClassOrFunction(firstArg)) {
      return decorator(...args);
      // If used as:
      // decorator(option1, option2, ..., optionN, ClassOrFunction)
    } else if (isClassOrFunction(lastArg)) {
      const ClassOrFunction = lastArg;
      const options = args.slice(0, -1);

      return decorator(ClassOrFunction, ...options);
    }


    /**
     * If used as:
     * @decorator()
     * @decorator(option1, option2, ..., optionN)
     * decorator(option1, option2, ..., optionN)(ClassOrFunction)
     *
     * @param {Function} ClassOrFunction
     */
    return function decoratorWrapper(ClassOrFunction) {
      const options = args;
      const hasOptions = argsLength > 0;

      return hasOptions ?
        decorator(ClassOrFunction, ...options) :
        decorator(ClassOrFunction);
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
