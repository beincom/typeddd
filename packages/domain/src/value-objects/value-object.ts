import { domainObjectToPlainObject } from '../utils';
import { isFunction, isObject, isOwnerProperties } from '@beincom/common';

export type Primitive = string | number | boolean;

export interface DomainPrimitive<T extends Primitive | Date> {
  value: T;
}
export type ValueObjectProps<T> = T extends Primitive | Date ? DomainPrimitive<T> : T;

export abstract class ValueObject<T> {
  protected readonly props: ValueObjectProps<T>;

  protected constructor(props: ValueObjectProps<T>) {
    this.validate(props);
    this.props = props;
  }

  public static isValueObject(obj: unknown): obj is ValueObject<unknown> {
    return obj instanceof ValueObject || (obj && isOwnerProperties(obj, ['value']));
  }

  public abstract validate(props: ValueObjectProps<T>): void | never;

  public get value(): T {
    if (this.isDomainPrimitive(this.props)) {
      return this.props.value;
    }

    const propsCopy = domainObjectToPlainObject(this.props);

    return Object.freeze(propsCopy as unknown as T);
  }

  public equals(props?: ValueObjectProps<T>): boolean {
    if (props === undefined) {
      return false;
    }
    return JSON.stringify(props) === JSON.stringify(props);
  }

  private isDomainPrimitive(obj: unknown): obj is DomainPrimitive<T & (Primitive | Date)> {
    return !!Object.prototype.hasOwnProperty.call(obj, 'value');
  }
}
