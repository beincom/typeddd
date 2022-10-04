import { BaseValueObject } from '../value-objects';
import type { BaseEntity } from '../entities/base.entity';
import { deepCopy, isObject, isOwnerProperties } from '@typeddd/common';

export const isEntity = (obj: any): obj is BaseEntity<any> => {
  return (
    isOwnerProperties(obj, ['toObject', 'id']) &&
    BaseValueObject.isValueObject((obj as BaseEntity<any>).id)
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

export const domainObjectToPlainObject = (props: any) => {
  const propsCopy = { ...props };

  for (const prop in propsCopy) {
    if (Array.isArray(propsCopy[prop])) {
      propsCopy[prop] = propsCopy[prop].map((item) => {
        return toPlainObject(item);
      });
    }
    if (isObject(propsCopy[prop])) {
      for (const entityProp in propsCopy[prop]) {
        propsCopy[prop][entityProp] = toPlainObject(propsCopy[prop][entityProp]);
      }
    }
    propsCopy[prop] = toPlainObject(propsCopy[prop]);
  }
  return deepCopy(propsCopy);
};
