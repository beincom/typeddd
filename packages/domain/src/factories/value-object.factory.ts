import type { BaseValueObject } from '../value-objects';

export type ValueObjectCtor<T, V> = new (args?: V) => T;

export class ValueObjectFactory {
  public static create<T extends BaseValueObject<V>, V>(ctor: ValueObjectCtor<T, V>, props?: V): T {
    return new ctor(props);
  }
}
