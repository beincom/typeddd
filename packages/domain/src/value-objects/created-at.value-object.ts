import { DateValueObject } from './date.value-object';

export class CreatedAtValueObject extends DateValueObject {
  public constructor(date = new Date()) {
    super(date);
  }

  public static fromPrototype(dateValueObject: DateValueObject): CreatedAtValueObject {
    return new CreatedAtValueObject(dateValueObject.value);
  }
}
