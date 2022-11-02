import { isNull } from '@beincom/common';
import { DateVO } from './date.value-object';
import { ValueObjectProperties } from './value-object';

export class DeletedAt extends DateVO {
  public validate(properties: ValueObjectProperties<Date>) {
    if (isNull(properties?.value)) {
      return { value: null };
    }
    return super.validate(properties);
  }

  public static fromPrototype(date: DateVO): DeletedAt {
    return new DeletedAt({ value: date.value });
  }
}
