import { RuntimeException } from '../exceptions';
import { isNull, isUndefined } from './shared.utils';

/**
 * Clone object.
 * @param target
 * @param argsCtor
 */
export const clone = <T>(target: any, argsCtor: any) => {
  if (isNull(target) || isUndefined(target)) {
    return;
  }
  const prototype = Reflect.getPrototypeOf(target);
  if (prototype) {
    return Reflect.construct(prototype.constructor, [argsCtor]) as unknown as T;
  }
  throw new RuntimeException("Can't get prototype of target");
};
