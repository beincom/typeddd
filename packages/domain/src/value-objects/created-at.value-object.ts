import { DateVO } from './date.value-object';
import { ValueObjectProperties } from './value-object';
import { NullAbleValue } from '../decorators';

@NullAbleValue()
export class CreatedAt extends DateVO {
  public constructor(properties: ValueObjectProperties<Date>) {
    super(properties);
  }

  public static fromPrototype(date: DateVO): CreatedAt {
    return new CreatedAt({ value: date.value });
  }
}
