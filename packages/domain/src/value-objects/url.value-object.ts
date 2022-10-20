import { isURL, IllegalArgumentException } from '@beincom/common';
import { ValueObject, ValueObjectProps } from './value-object';

export class UrlValueObject extends ValueObject<string> {
  public constructor(url: string) {
    super({
      value: url,
    });
  }

  public validate(props: ValueObjectProps<string>): void {
    if (!isURL(props.value)) {
      throw new IllegalArgumentException('Invalid url value');
    }
  }
}
