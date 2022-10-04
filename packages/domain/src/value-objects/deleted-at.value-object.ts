import { DateValueObject } from './date.value-object';

export class DeletedAtValueObject extends DateValueObject {
  constructor(date = new Date()) {
    super(date);
  }

  public static fromPrototype(dateValueObject: DateValueObject): DeletedAtValueObject {
    return new DeletedAtValueObject(dateValueObject.value);
  }
}
