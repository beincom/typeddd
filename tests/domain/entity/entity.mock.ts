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
  ID,
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

export type XProps = {
  username: Username;
  fullname: Fullname;
};

export class X extends ID<XProps> {
  public constructor(properties: ValueObjectProperties<XProps>) {
    super(properties);
  }

  public validate(properties: ValueObjectProperties<XProps>): void {}
}

export class User extends Entity<X, UserProps> {
  protected _id: X;

  constructor(entityProps: EntityProps<X, UserProps>, setting?: EntitySetting) {
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
  const fullname = new Fullname({ firstname: 'the', lastname: 'van' });

  const user = new User({
    id: new X({ username, fullname }),
    props: {
      nickname,
      username,
      fullname,
    },
    createdAt: CreatedAt.fromPrototype(date),
    updatedAt: UpdatedAt.fromPrototype(date),
  });

  return user;
}
initUser();
