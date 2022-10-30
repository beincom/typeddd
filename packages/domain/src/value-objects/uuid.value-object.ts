import { ID } from './id.value-object';
import { ValueObjectProperties } from './value-object';
import { getInvalidValueMessage } from '../utils/domain.utils';
import { isUUID, IllegalArgumentException, generateUUID } from '@beincom/common';

export class UUID extends ID {
  public constructor(properties: ValueObjectProperties<string>) {
    super(properties);
  }

  public validate(properties: ValueObjectProperties<string>) {
    if (!isUUID(properties.value)) {
      throw new IllegalArgumentException(getInvalidValueMessage(this));
    }
  }

  public static generate(): UUID {
    const id = generateUUID();
    return new UUID({ value: id });
  }
}
