import { VALUE_OBJECT_PROPERTIES_METADATA } from '../constants';

export type PropertyOptions = {
  allowNull: boolean;
};
export type ValueObjectOptions<T> = {
  [K in keyof T]: PropertyOptions;
};

export const NullAbleValueObject = <T>(options?: ValueObjectOptions<T>): ClassDecorator => {
  return function (target) {
    Reflect.defineMetadata(VALUE_OBJECT_PROPERTIES_METADATA, options, target);
  };
};
