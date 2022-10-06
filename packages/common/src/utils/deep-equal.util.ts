import { deepEqual as de } from 'fast-equals';

export const deepEqual = <T, S>(target: T, source: S) => {
  return de<T, S>(target, source);
};
