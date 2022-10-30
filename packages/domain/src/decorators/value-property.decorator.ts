import 'reflect-metadata';
import { ValueObject } from '../value-objects';
import { VALUE_OBJECT_PROPERTY_METADATA } from '../constants';

export type ValuePropertyOptions = {
  allowNull: boolean;
};

export const ValueProperty = <T extends ValueObject<unknown>>(
  options?: ValuePropertyOptions,
): PropertyDecorator => {
  return function (target: T, propertyKey) {
    Reflect.defineMetadata(
      VALUE_OBJECT_PROPERTY_METADATA,
      {
        [propertyKey]: options,
      },
      target,
    );
  };
};
