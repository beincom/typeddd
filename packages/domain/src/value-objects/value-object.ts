import { ValueObjectProperty } from '../decorators';
import { clone, deepEqual, DeepPartial, isDate } from '@beincom/common';
import {
  cloneValueObjectProps,
  isDomainPrimitiveProperties,
  valueObjectToPlain,
} from '../utils/domain.utils';

export type Primitive = string | number | boolean;

export type DomainPrimitive = Primitive | Date;

export type DomainPrimitiveProperties<T> = {
  value: T;
};

export type DomainProperties<T> = {
  [K in keyof T]: T | DeepPartial<T[K]> | DeepPartial<T[K]>[];
};

export type ValueObjectProperties<T> = T extends DomainPrimitive
  ? DomainPrimitiveProperties<T>
  : DomainProperties<T>;

export abstract class ValueObject<T = any> {
  @ValueObjectProperty()
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
   * @return T
   */
  public get value() {
    if (isDomainPrimitiveProperties(this.properties)) {
      return this.properties.value;
    }
    const values = valueObjectToPlain<T>(this.properties);
    return Object.freeze(values as unknown as T);
  }

  /**
   * Clone value object.
   */
  public clone<C extends ValueObject<T> = this>(): C {
    if (this.properties === null || this.properties === undefined) {
      return clone<C>(this, [{ value: null }]);
    }

    if (isDomainPrimitiveProperties(this.properties)) {
      if (isDate(this.properties.value)) {
        const dateClone = new Date(this.properties.value);
        return clone<C>(this, [{ value: dateClone }]);
      }
      return clone<C>(this, [{ value: this.properties.value }]);
    }

    return cloneValueObjectProps<C>(this, this.properties);
  }
}
