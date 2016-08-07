import _ from 'lodash';
import test from 'tape';
import sinon from 'sinon';
import decorateWithOptions from './index';

test('decorateWithOptions()', t => {
  t.equal(_.isFunction(decorateWithOptions), true, 'should be a function');

  t.end();
});

test('decorateWithOptions() called without arguments', t => {
  t.throws(decorateWithOptions, /Decorator must be a function\. Received: undefined/, 'should throw');

  t.end();
});

test('decorateWithOptions() called with a function as an argument', t => {
  const fn = _.partial(decorateWithOptions, _.noop);

  t.doesNotThrow(fn, true, 'should not throw');

  const result = fn();
  t.equal(_.isFunction(result), true, 'should return a function');

  t.end();
});

test('Decorator function, created with decorateWithOptions(originalDecorator)', t => {
  test('called as @decorator', t => {
    const originalDecorator = createDecorator();
    const decorator = decorateWithOptions(originalDecorator);

    @decorator
    class Class {}

    t.equal(originalDecorator.calledOnce, true, 'should result in one call to original decorator');
    t.equal(
      originalDecorator.calledWithExactly(Class),
      true,
      'should call original decorator with Class as an argument'
    );
    t.equal(Class.isDecorated, true, 'should result in the decorated Class');

    t.end();
  });

  test('called as decorator(ClassOrFunction)', t => {
    const originalDecorator = createDecorator();
    const decorator = decorateWithOptions(originalDecorator);

    class Class {}
    const DecoratedClass = decorator(Class);

    t.equal(originalDecorator.calledOnce, true, 'should result in one call to original decorator');
    t.equal(
      originalDecorator.calledWithExactly(Class),
      true,
      'should call original decorator with Class or Function as an argument'
    );
    t.equal(DecoratedClass.isDecorated, true, 'should result in the decorated Class');

    t.end();
  });

  test('called as decorator(ClassOrFunction, options)', t => {
    const originalDecorator = createDecorator();
    const decorator = decorateWithOptions(originalDecorator);

    class Class {}
    const options = { foo: 'bar' };

    const DecoratedClass = decorator(Class, options);

    t.equal(originalDecorator.calledOnce, true, 'should result in a call to original decorator');
    t.equal(
      originalDecorator.calledWithExactly(Class, options),
      true,
      'should call original decorator with Class or Function and options as arguments'
    );
    t.equal(DecoratedClass.isDecorated, true, 'should result in the decorated Class');

    t.end();
  });

  test('called as decorator(ClassOrFunction, option1, option2, ...)', t => {
    const originalDecorator = createDecorator();
    const decorator = decorateWithOptions(originalDecorator);

    class Class {}
    const option1 = 'foo';
    const option2 = { bar: 'baz' };

    const DecoratedClass = decorator(Class, option1, option2);

    t.equal(originalDecorator.calledOnce, true, 'should result in a call to original decorator');
    t.equal(
      originalDecorator.calledWithExactly(Class, option1, option2),
      true,
      'should call original decorator with Class or Function and options as arguments'
    );
    t.equal(DecoratedClass.isDecorated, true, 'should result in the decorated Class');

    t.end();
  });

  test('called as decorator(options, ClassOrFunction)', t => {
    const originalDecorator = createDecorator();
    const decorator = decorateWithOptions(originalDecorator);

    class Class {}
    const options = { foo: 'bar' };

    const DecoratedClass = decorator(options, Class);

    t.equal(originalDecorator.calledOnce, true, 'should result in one call to original decorator');
    t.equal(
      originalDecorator.calledWithExactly(Class, options),
      true,
      'should call original decorator with Class or Function and options as arguments'
    );
    t.equal(DecoratedClass.isDecorated, true, 'should result in the decorated Class or Function');

    t.end();
  });

  test('called as decorator(option1, option2, ..., ClassOrFunction)', t => {
    const originalDecorator = createDecorator();
    const decorator = decorateWithOptions(originalDecorator);

    class Class {}
    const option1 = 'foo';
    const option2 = { bar: 'baz' };

    const DecoratedClass = decorator(option1, option2, Class);

    t.equal(originalDecorator.calledOnce, true, 'should result in one call to original decorator');
    t.equal(
      originalDecorator.calledWithExactly(Class, option1, option2),
      true,
      'should call original decorator with Class or Function and options as arguments'
    );
    t.equal(DecoratedClass.isDecorated, true, 'should result in the decorated Class or Function');

    t.end();
  });

  test('called as @decorator()', t => {
    const originalDecorator = createDecorator();
    const decorator = decorateWithOptions(originalDecorator);

    @decorator()
    class Class {}

    t.equal(originalDecorator.calledOnce, true, 'should result in one call to original decorator');
    t.equal(
      originalDecorator.calledWithExactly(Class),
      true,
      'should call original decorator with Class and options as arguments'
    );
    t.equal(Class.isDecorated, true, 'should result in the decorated Class');

    t.end();
  });

  test('called as @decorator(options)', t => {
    const originalDecorator = createDecorator();
    const decorator = decorateWithOptions(originalDecorator);

    const options = { foo: 'bar' };

    @decorator(options)
    class Class {}

    t.equal(originalDecorator.calledOnce, true, 'should result in one call to original decorator');
    t.equal(
      originalDecorator.calledWithExactly(Class, options),
      true,
      'should call original decorator with Class and options as arguments'
    );
    t.equal(Class.isDecorated, true, 'should result in the decorated Class');

    t.end();
  });

  test('called as @decorator(option1, option2, ...)', t => {
    const originalDecorator = createDecorator();
    const decorator = decorateWithOptions(originalDecorator);

    const option1 = 'foo';
    const option2 = { bar: 'baz' };

    @decorator(option1, option2)
    class Class {}

    t.equal(originalDecorator.calledOnce, true, 'should result in one call to original decorator');
    t.equal(
      originalDecorator.calledWithExactly(Class, option1, option2),
      true,
      'should call original decorator with Class and options as arguments'
    );
    t.equal(Class.isDecorated, true, 'should result in the decorated Class');

    t.end();
  });

  test('called as decorator(options)(ClassOrFunction)', t => {
    const originalDecorator = createDecorator();
    const decorator = decorateWithOptions(originalDecorator);

    const options = { foo: 'bar' };
    class Class {}

    const DecoratedClass = decorator(options)(Class);

    t.equal(originalDecorator.calledOnce, true, 'should result in one call to original decorator');
    t.equal(
      originalDecorator.calledWithExactly(Class, options),
      true,
      'should call original decorator with Class or Function and options as arguments'
    );
    t.equal(DecoratedClass.isDecorated, true, 'should result in the decorated Class or Function');

    t.end();
  });

  test('called as decorator(option1, option2, ...)(ClassOrFunction)', t => {
    const originalDecorator = createDecorator();
    const decorator = decorateWithOptions(originalDecorator);

    const option1 = 'foo';
    const option2 = { bar: 'baz' };
    class Class {}

    const DecoratedClass = decorator(option1, option2)(Class);

    t.equal(originalDecorator.calledOnce, true, 'should result in one call to original decorator');
    t.equal(
      originalDecorator.calledWithExactly(Class, option1, option2),
      true,
      'should call original decorator with Class or Function and options as arguments'
    );
    t.equal(DecoratedClass.isDecorated, true, 'should result in the decorated Class or Function');

    t.end();
  });

  t.end();
});

/**
 * @returns {Function}
 */
function createDecorator() {
  return sinon.spy(function originalDecorator(ClassOrFunction) {
    ClassOrFunction.isDecorated = true;

    return ClassOrFunction;
  });
}

