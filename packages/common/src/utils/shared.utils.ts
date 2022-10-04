import { validate } from 'uuid';

export const isUndefined = (input: any): input is undefined => typeof input === 'undefined';

export const isNull = (input: any): input is null => input === null;

export const isObject = (input: any): input is object =>
  !isNull(input) && typeof input === 'object';

export const isPlainObject = (input: any): input is object => {
  if (!isObject(input)) {
    return false;
  }
  const proto = Object.getPrototypeOf(input);
  if (proto === null) {
    return true;
  }
  const ctor = Object.prototype.hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return (
    typeof ctor === 'function' &&
    ctor instanceof ctor &&
    Function.prototype.toString.call(ctor) === Function.prototype.toString.call(Object)
  );
};

export const isDate = (input: any): input is Date => input instanceof Date;

export const isFunction = (input: any): boolean => typeof input === 'function';

export const isString = (input: any): input is string => typeof input === 'string';

export const isNumber = (input: any): input is number => typeof input === 'number';

export const isEmptyArray = (input: any): boolean => !(input && input.length > 0);

export const isEmptyObject = (input: any): boolean => {
  return JSON.stringify(input) === '{}';
};

export const isSymbol = (input: any): input is symbol => typeof input === 'symbol';
