import { DateVO } from './date.value-object';
import { ValueObjectProperties } from './value-object';
import { NullAbleValue } from '../decorators';

@NullAbleValue()
export class UpdatedAt extends DateVO {
  public constructor(properties: ValueObjectProperties<Date>) {
    super(properties);
  }

  public static fromPrototype(date: DateVO): UpdatedAt {
    return new UpdatedAt({ value: date.value });
  }
}
