import { isDate, isFunction, isNull, isObject } from './shared.utils';

/**
 * Deep copy object.
 * @param target
 */
export const deepCopy = <T>(target: T): T => {
  if (isNull(target)) {
    return target;
  }
  if (isDate(target)) {
    return new Date(target.getTime()) as any;
  }

  if (!isObject(target)) {
    return target;
  }

  if (isFunction(target[Symbol.iterator])) {
    const cpi = [] as any[];
    if ((target as any as any[]).length > 0) {
      for (const arrayMember of target as any as any[]) {
        cpi.push(deepCopy(arrayMember));
      }
    }
    return cpi as unknown as T;
  }
  const targetKeys = Object.keys(target);
  const cpo = {};

  if (targetKeys.length > 0) {
    for (const key of targetKeys) {
      cpo[key] = deepCopy(target[key]);
    }
  }
  return cpo as unknown as T;
};
