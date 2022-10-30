import { DeepPartial, isNull, isUndefined } from '@beincom/common';
import { DomainPrimitive, DomainPrimitiveProperties, ValueObject } from '../value-objects';

export const isDomainPrimitiveProperties = <T = DomainPrimitive>(
  target: unknown,
): target is DomainPrimitiveProperties<T> => {
  return target && !!(target as DomainPrimitiveProperties<T>).value;
};

export const valueObjectToPlain = <T>(target: any): DeepPartial<T> => {
  if (isUndefined(target)) {
    return null;
  }

  if (
    isNull(target) ||
    typeof target === 'number' ||
    typeof target === 'string' ||
    typeof target === 'symbol'
  ) {
    return target;
  }

  if (isDomainPrimitiveProperties(target)) {
    return target.value;
  }

  if (Array.isArray(target)) {
    const cp = [];
    for (const item of target) {
      cp.push(valueObjectToPlain(item));
    }
    return cp;
  }

  const cpo = {};

  const keys = Object.keys(target);
  if (keys.length > 0) {
    for (const key of keys) {
      cpo[key] = valueObjectToPlain(target[key]);
    }
  }

  return cpo as unknown as T;
};

export const getInvalidValueMessage = (vo: ValueObject<unknown>, msg?: string) => {
  if (msg) {
    return msg;
  }
  return `${vo.constructor.name} value invalid`;
};
