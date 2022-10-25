import type { Entity } from '../entities';
import { ValueObject } from '../value-objects';
import { deepCopy, isObject, isOwnerProperties } from '@beincom/common';

export const isEntity = (obj: any): obj is Entity<any, any> => {
  return (
    obj &&
    isOwnerProperties(obj, ['toObject', 'id']) &&
    ValueObject.isValueObject((obj as Entity<any, any>).id)
  );
};

export const toPlainObject = (item: any) => {
  if (Array.isArray(item)) {
    return item.map((i) => toPlainObject(i));
  }

  if (ValueObject.isValueObject(item)) {
    return item.value;
  }

  if (isEntity(item)) {
    return item.toObject();
  }

  return item;
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
