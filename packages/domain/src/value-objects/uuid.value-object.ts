import { IdValueObject } from './id.value-object';
import type { ValueObjectProps } from './value-object';
import { isUUID, IllegalArgumentException, generateUUID } from '@beincom/common';

export class UUIDValueObject extends IdValueObject {
  public constructor(id: string) {
    super(id);
  }

  public validate(props: ValueObjectProps<string>): void {
    if (!isUUID(props.value)) {
      throw new IllegalArgumentException('Invalid uuid value');
    }
  }

  public static generate(): UUIDValueObject {
    const id = generateUUID();
    return new UUIDValueObject(id);
  }
}
