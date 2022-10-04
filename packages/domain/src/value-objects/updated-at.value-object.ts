import { DateValueObject } from './date.value-object';

export class UpdatedAtValueObject extends DateValueObject {
  constructor(date = new Date()) {
    super(date);
  }

  public static fromPrototype(dateValueObject: DateValueObject): UpdatedAtValueObject {
    return new UpdatedAtValueObject(dateValueObject.value);
  }
}
