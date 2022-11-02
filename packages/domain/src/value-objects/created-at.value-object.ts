import { DateVO } from './date.value-object';

export class CreatedAt extends DateVO {
  public static fromPrototype(date: DateVO): CreatedAt {
    return new CreatedAt({ value: date.value });
  }
}
