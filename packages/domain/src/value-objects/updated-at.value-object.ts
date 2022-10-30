import { DateVO } from './date.value-object';

export class UpdatedAt extends DateVO {
  public constructor(date = new Date()) {
    super(date);
  }

  public static fromPrototype(dateValueObject: DateVO): UpdatedAt {
    return new UpdatedAt(dateValueObject.value);
  }
}
