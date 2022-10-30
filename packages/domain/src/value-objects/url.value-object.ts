import { isURL, IllegalArgumentException } from '@beincom/common';
import { ValueObject, ValueObjectProperties } from './value-object';

export class URL extends ValueObject<string> {
  public constructor(url: string) {
    super({
      value: url,
    });
  }

  public validate(props: ValueObjectProperties<string>): void {
    if (!isURL(props.value)) {
      throw new IllegalArgumentException('Invalid url value');
    }
  }
}
