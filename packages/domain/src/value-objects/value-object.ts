import { deepEqual, DeepPartial } from '@beincom/common';
import { isDomainPrimitiveProperties, valueObjectToPlain } from '../utils/domain.utils';

export type Primitive = string | number | boolean;

export type DomainPrimitive = Primitive | Primitive[] | Date | Date[];

export type DomainPrimitiveProperties<T> = {
  value: T;
};

export type DomainProperties<T> = {
  [K in keyof T]: T | DeepPartial<T[K]> | DeepPartial<T[K]>[];
};

export type ValueObjectProperties<T> = T extends DomainPrimitive
  ? DomainPrimitiveProperties<T>
  : DomainProperties<T>;

export abstract class ValueObject<T> {
  protected readonly properties: ValueObjectProperties<T>;

  protected constructor(properties: ValueObjectProperties<T>) {
    this.validate(properties);
    this.properties = properties;
  }

  /**
   * Compare two value objects
   * @param vo ValueObject
   */
  public equal(vo: ValueObject<unknown>): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }
    return deepEqual(this, vo);
  }

  /**
   * This method will be called when initializing the value object.
   * This method will throw exception if properties invalid.
   * @param properties ValueObjectProperties
   */
  public abstract validate(properties: ValueObjectProperties<T>): void | never;

  /**
   * Get the value of the value object.
   * If the value object property's type is Primitive return that value.
   * If the value object property's type is object return plaint object.
   * This value has been frozen.
   * @return DeepPartial<T>
   */
  public get value() {
    if (isDomainPrimitiveProperties(this.properties)) {
      return this.properties.value;
    }
    const values = valueObjectToPlain<T>(this.properties);
    return Object.freeze(values as unknown as T);
  }
}
