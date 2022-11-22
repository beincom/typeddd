import { getInvalidValueMessage } from '../utils/domain.utils';
import { IllegalArgumentException, isEmail } from '@beincom/common';
import { ValueObject, ValueObjectProperties } from './value-object';
import { NullAbleValue } from '../decorators';

@NullAbleValue()
export class Email extends ValueObject<string> {
  public constructor(properties: ValueObjectProperties<string>) {
    super(properties);
  }

  public validate(properties: ValueObjectProperties<string>): void {
    if (!isEmail(properties.value)) {
      throw new IllegalArgumentException(getInvalidValueMessage(this));
    }
  }
}
