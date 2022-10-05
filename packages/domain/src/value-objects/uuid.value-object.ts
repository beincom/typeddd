import { BaseValueObject } from './base.value-object';
import type { DomainPrimitive } from './base.value-object';
import { isUUID, IllegalArgumentException, generateUUID } from '@typeddd/common';

export class UUIDValueObject extends BaseValueObject<string> {
  protected constructor(id: string) {
    super({
      value: id,
    });
  }

  public validate(props: DomainPrimitive<string>): void {
    if (!isUUID(props.value)) {
      throw new IllegalArgumentException('Invalid uuid value');
    }
  }

  public static generate(): UUIDValueObject {
    const id = generateUUID();
    return new UUIDValueObject(id);
  }
}
