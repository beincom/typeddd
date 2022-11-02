import { ENTITY_PROPERTIES_METADATA, VALUE_OBJECT_PROPERTIES_METADATA } from '../constants';

export function EntityProperty(): PropertyDecorator {
  return function (target: any, propertyName: string) {
    Reflect.defineMetadata(
      ENTITY_PROPERTIES_METADATA,
      {
        propertyName,
        isProperty: true,
      },
      target,
    );
  };
}

export function ValueObjectProperty(): PropertyDecorator {
  return function (target: any, propertyName: string) {
    Reflect.defineMetadata(
      VALUE_OBJECT_PROPERTIES_METADATA,
      {
        propertyName,
        isProperty: true,
      },
      target,
    );
  };
}
