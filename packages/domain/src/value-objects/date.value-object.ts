import { getInvalidValueMessage } from '../utils/domain.utils';
import { IllegalArgumentException, isDate } from '@beincom/common';
import { ValueObject, ValueObjectProperties } from './value-object';

export class DateVO extends ValueObject<Date> {
  public constructor(date: Date) {
    super({ value: date });
  }

  public static fromDateString(dateStr: string) {
    return new DateVO(new Date(dateStr));
  }

  public validate(properties: ValueObjectProperties<Date>) {
    if (!isDate(properties.value)) {
      throw new IllegalArgumentException(getInvalidValueMessage(this));
    }
  }
}
