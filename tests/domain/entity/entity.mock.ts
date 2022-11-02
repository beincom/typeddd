import {
  Entity,
  EntitySetting,
  UUID,
  ValueObject,
  ValueObjectProperties,
  EntityProps,
  DateVO,
  CreatedAt,
  UpdatedAt,
} from '../../../packages/domain/src';

export type FullnameProps = {
  firstname: string;
  lastname: string;
};
export class Fullname extends ValueObject<FullnameProps> {
  public constructor(properties: ValueObjectProperties<FullnameProps>) {
    super(properties);
  }

  public validate(properties: ValueObjectProperties<FullnameProps>): void {}
}

export class Nickname extends ValueObject<string> {
  public constructor(properties: ValueObjectProperties<string>) {
    super(properties);
  }

  public validate(properties: ValueObjectProperties<string>): void {
    if (properties.value.length < 3) {
      throw new Error('invalid Nickname');
    }
  }
}

export class Username extends ValueObject<string> {
  public constructor(properties: ValueObjectProperties<string>) {
    super(properties);
  }

  public validate(properties: ValueObjectProperties<string>): void {
    if (properties.value.length < 5) {
      throw new Error('invalid Username');
    }
  }
}

export type UserProps = {
  username: Username;
  nickname: Nickname[];
  fullname: Fullname;
};

export class User extends Entity<UUID, UserProps> {
  protected _id: UUID;

  constructor(entityProps: EntityProps<UUID, UserProps>, setting?: EntitySetting) {
    super(entityProps, setting);
    this._id = entityProps.id;
  }

  public validate(): void {
    const props = this.toObject<object>();
    if (Object.keys(props).length > 50) {
      throw new Error('Entity too long');
    }
  }
}

export function initUser() {
  const id = UUID.generate();
  const nickname = ['chibi', 'yato'].map((nick) => new Nickname({ value: nick }));
  const username = new Username({ value: 'nattogo' });
  const date = new DateVO({ value: new Date() });

  const user = new User({
    id,
    props: {
      nickname,
      username,
      fullname: new Fullname({ firstname: 'the', lastname: 'van' }),
    },
    createdAt: CreatedAt.fromPrototype(date),
    updatedAt: UpdatedAt.fromPrototype(date),
  });

  user.set('id', UUID.generate());
  user.set({
    nickname: [],
  });

  return user;
}
initUser();
