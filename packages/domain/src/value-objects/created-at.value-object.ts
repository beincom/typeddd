import { DateVO } from './date.value-object';

export class CreatedAt extends DateVO {
  public constructor(date = new Date()) {
    super(date);
  }

  public static fromPrototype(date: DateVO): CreatedAt {
    return new CreatedAt(date.value);
  }
}
