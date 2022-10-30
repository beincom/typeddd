import { isDate, isNull } from '@beincom/common';
import { DateVO } from './date.value-object';
import { ValueObjectProperties } from './value-object';

export class DeletedAt extends DateVO {
  public constructor(date) {
    super(date);
  }

  public validate(properties: ValueObjectProperties<Date>) {
    if (isNull(properties.value)) {
      return;
    }
    return super.validate(properties);
  }

  public static fromPrototype(dateValueObject: DateVO): DeletedAt {
    return new DeletedAt(dateValueObject.value);
  }
}
