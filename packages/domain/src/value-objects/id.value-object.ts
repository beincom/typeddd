import { ValueObject, ValueObjectProps } from './value-object';

export abstract class IdValueObject extends ValueObject<string> {
  protected constructor(id: string) {
    super({ value: id });
  }

  public abstract validate(props: ValueObjectProps<string>): void;
}
