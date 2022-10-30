import { RuntimeException } from '../../exceptions';

interface IFunction<T> extends Function {
  new (...args: any[]): T;
}

/**
 * The Final decorator. This decorator make class can't have subclass.
 */
export function Final() {
  return function <T>(constructor: IFunction<T>): any {
    const FinalClassCtor = function (...args: any[]): T {
      if (new.target.prototype !== constructor.prototype) {
        throw new RuntimeException(`Can't extend final class ${constructor.name}`);
      }
      return new constructor(args);
    };
    // support `instance of` operator work
    FinalClassCtor.prototype = constructor.prototype;

    // change name of new class
    Object.defineProperty(FinalClassCtor, 'name', {
      value: constructor.name,
      writable: false,
    });

    // copy static method
    const staticMethodNames = Object.getOwnPropertyNames(constructor);

    staticMethodNames.forEach((method) => {
      if (!['length', 'name', 'prototype'].includes(method)) {
        FinalClassCtor[method] = constructor[method];
      }
    });

    Object.seal(FinalClassCtor);
    Object.freeze(FinalClassCtor.prototype);

    return FinalClassCtor as unknown as IFunction<T>;
  };
}
