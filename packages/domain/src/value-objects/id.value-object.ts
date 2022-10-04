import { generateUUID } from '@typeddd/common';
import { UUIDValueObject } from './uuid.value-object';

export class IdValueObject extends UUIDValueObject {
  public constructor(id = generateUUID()) {
    super(id);
  }
}
