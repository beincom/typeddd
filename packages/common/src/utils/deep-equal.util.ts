import { deepEqual as de } from 'fast-equals';

/**
 *  Deep compare two objects.
 * @param target
 * @param source
 */
export const deepEqual = <T, S>(target: T, source: S) => {
  return de<T, S>(target, source);
};
