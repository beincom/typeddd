import { getInvalidValueMessage } from '../utils/domain.utils';
import { ValueObject, ValueObjectProperties } from './value-object';
import { IllegalArgumentException, isNull, isUndefined } from '@beincom/common';

export abstract class ID extends ValueObject<string> {
  protected constructor(properties: ValueObjectProperties<string>) {
    super(properties);
  }

  public validate(properties: ValueObjectProperties<string>) {
    if (isNull(properties.value) || isUndefined(properties.value) || properties.value === '') {
      throw new IllegalArgumentException(getInvalidValueMessage(this));
    }
  }
}
