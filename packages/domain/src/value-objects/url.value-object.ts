import { isURL, IllegalArgumentException } from '@typeddd/common';
import { BaseValueObject, ValueObjectProps } from './base.value-object';

export class UrlValueObject extends BaseValueObject<string> {
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
