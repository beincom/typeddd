import { DateValueObject } from './date.value-object';
import { ValueObjectProps } from '../value-objects';
import { isNull, isUndefined } from '@beincom/common';

export class DeletedAtValueObject extends DateValueObject {
  public constructor(date = new Date()) {
    super(date);
  }

  public validate(props: ValueObjectProps<Date>) {
    if (isNull(props.value) || isUndefined(props.value)) {
      return;
    }
    super.validate(props);
  }

  public static fromPrototype(dateValueObject: DateValueObject): DeletedAtValueObject {
    return new DeletedAtValueObject(dateValueObject.value);
  }
}
