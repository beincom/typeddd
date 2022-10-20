import type { ValueObject } from '../value-objects';

export type ValueObjectCtor<T, V> = new (args?: V) => T;

export class ValueObjectFactory {
  public static create<T extends ValueObject<V>, V>(ctor: ValueObjectCtor<T, V>, props?: V): T {
    return new ctor(props);
  }
}
