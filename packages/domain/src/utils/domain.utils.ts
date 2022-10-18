import type { BaseEntity } from '../entities';
import { BaseValueObject } from '../value-objects';
import { deepCopy, isObject, isOwnerProperties } from '@typeddd/common';

export const isEntity = (obj: any): obj is BaseEntity<any, any> => {
  return (
    obj &&
    isOwnerProperties(obj, ['toObject', 'id']) &&
    BaseValueObject.isValueObject((obj as BaseEntity<any, any>).id)
  );
};

export const toPlainObject = (item: any) => {
  if (BaseValueObject.isValueObject(item)) {
    return item.value;
  }
  if (isEntity(item)) {
    return item.toObject();
  }
  return item;
};

const forkAssign = (source: any, readOnlyProperty: any, value: any): any => {
  Object.defineProperties(source, {
    [readOnlyProperty]: {
      value,
      writable: true,
    },
  });
};

export const domainObjectToPlainObject = (props: any) => {
  const propsCopy = {};

  for (const prop in props) {
    if (Array.isArray(props[prop])) {
      propsCopy[prop] = props[prop].map((item) => {
        return toPlainObject(item);
      });
    }
    if (isObject(props[prop])) {
      for (const entityProp in props[prop]) {
        propsCopy[prop] = { [entityProp]: {} };
        propsCopy[prop][entityProp] = toPlainObject(props[prop][entityProp]);
      }
    }
    propsCopy[prop] = toPlainObject(props[prop]);
  }
  return deepCopy(propsCopy);
};
