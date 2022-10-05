import { BaseValueObject, ValueObjectProps } from './base.value-object';

export abstract class IdValueObject extends BaseValueObject<string> {
  protected constructor(id: string) {
    super({ value: id });
  }

  public abstract validate(props: ValueObjectProps<string>): void;
}
