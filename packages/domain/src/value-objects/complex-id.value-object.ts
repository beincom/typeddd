import { BaseValueObject, ValueObjectProps } from './base.value-object';

export abstract class ComplexIdValueObject<T> extends BaseValueObject<T> {
  protected constructor(complexId: ValueObjectProps<T>) {
    super(complexId);
  }

  public abstract validate(props: ValueObjectProps<T>): void;
}
