import { ValueObject } from './value-object';
import type { ValueObjectProps } from './value-object';
import { isDate, IllegalArgumentException } from '@beincom/common';

export class DateValueObject extends ValueObject<Date> {
  public constructor(date: Date) {
    super({ value: date });
  }

  public validate(props: ValueObjectProps<Date>): void {
    if (!isDate(props.value)) {
      throw new IllegalArgumentException('Invalid date value');
    }
  }

  public static fromDateString(dateStr: string) {
    return new DateValueObject(new Date(dateStr));
  }
}
