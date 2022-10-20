import { ValueObject, ValueObjectProps } from './value-object';

export abstract class ComplexIdValueObject<T> extends ValueObject<T> {
  protected constructor(complexId: ValueObjectProps<T>) {
    super(complexId);
  }

  public abstract validate(props: ValueObjectProps<T>): void;
}
