import {
  cloneValueObjectProps,
  getNullableConfig,
  isDomainPrimitiveProperties,
  valueObjectToPlain,
} from '../utils/domain.utils';
import { ValueObjectProperty } from '../decorators';
import { clone, deepEqual, isDate, isEmptyObject, isUndefined, isNull } from '@beincom/common';

export type Primitive = string | number | boolean;

export type DomainPrimitive = Primitive | Date;

export type DomainPrimitiveProperties<T> = {
  value: T;
};

export type DomainProperties<T> = {
  [K in keyof T]: T[K];
};

export type RawProperties<T> = {
  [K in keyof T]: T[K] extends ValueObject
    ? T[K]['properties'] extends DomainPrimitive
      ? T[K]['properties']['value']
      : RawProperties<T[K]['properties']>
    : DomainPrimitiveProperties<T[K]>['value'];
};

export type ValueObjectProperties<T> = T extends DomainPrimitive
  ? DomainPrimitiveProperties<T>
  : DomainProperties<T>;

export abstract class ValueObject<T = any> {
  @ValueObjectProperty()
  protected readonly _properties: ValueObjectProperties<T>;

  private propNullable = getNullableConfig(this?.constructor?.name);

  private isEmptyProperties(properties: ValueObjectProperties<T>) {
    const propValues = isDomainPrimitiveProperties(properties) ? properties.value : properties;

    return isEmptyObject(propValues) || isUndefined(propValues) || isNull(propValues);
  }

  protected constructor(properties: ValueObjectProperties<T>) {
    if (this.isEmptyProperties(properties)) {
      if (!this.propNullable) {
        this.validate(properties);
      }
      this._properties = properties;
    } else {
      this.validate(properties);
      this._properties = properties;
    }
  }

  public get properties(): ValueObjectProperties<T> {
    return this._properties;
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
   */
  public get value(): RawProperties<T> {
    if (isDomainPrimitiveProperties(this.properties)) {
      return this.properties.value;
    }
    const values = valueObjectToPlain(this.properties);
    return Object.freeze(values as unknown as RawProperties<T>);
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
