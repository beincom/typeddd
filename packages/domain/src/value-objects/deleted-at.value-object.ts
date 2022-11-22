import { DateVO } from './date.value-object';
import { ValueObjectProperties } from './value-object';
import { NullAbleValue } from '../decorators';

@NullAbleValue()
export class DeletedAt extends DateVO {
  public constructor(properties: ValueObjectProperties<Date>) {
    super(properties);
  }

  public static fromPrototype(date: DateVO): DeletedAt {
    return new DeletedAt({ value: date.value });
  }
}
