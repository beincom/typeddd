import { DateVO } from './date.value-object';

export class UpdatedAt extends DateVO {
  public static fromPrototype(date: DateVO): UpdatedAt {
    return new UpdatedAt({ value: date.value });
  }
}
