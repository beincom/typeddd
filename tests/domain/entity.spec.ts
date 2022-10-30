import {
  CreatedAtValueObject,
  ValueObjectProps,
  ComplexIdValueObject,
  UpdatedAtValueObject,
  UUIDValueObject,
  ValueObjectProperties,
} from '../../packages/domain/src/value-objects';
import { EntityProps } from '../../packages/domain/src/interfaces/domain';
import { Entity } from '../../packages/domain/src/entities/entity';
import { ValueObject } from '../../packages/domain/src/value-objects';

export type PreviewMemberProps = {
  userIds: UserId[];
};

export class PreviewMembers extends ValueObject<PreviewMemberProps> {
  constructor(props: ValueObjectProps<PreviewMemberProps>) {
    super(props);
  }

  validate(props: ValueObjectProps<PreviewMemberProps>): void {}
}

export class UserId extends UUIDValueObject {
  validate(props: ValueObjectProps<string>): void {}
}

export class GroupId extends UUIDValueObject {
  validate(props: ValueObjectProps<string>): void {}
}

type UserIdProps = {
  userId: UserId;
  groupId: GroupId;
};

class UserComplexId extends ValueObject<UserIdProps> {
  public constructor(props: ValueObjectProps<UserIdProps>) {
    super(props);
  }

  validate(props: ValueObjectProps<UserIdProps>): void {
    process.cwd();
  }
}

type IUserProps = {
  previewMembers: PreviewMembers;
};

export class UserProps extends ValueObject<IUserProps> {
  public constructor(props: ValueObjectProps<IUserProps>) {
    super(props);
  }

  validate(props: ValueObjectProps<IUserProps>): void {}
}

class UserComplexIdEntity extends Entity<UserComplexId, UserProps> {
  protected _id: UserComplexId;

  public constructor(props: EntityProps<UserComplexId, UserProps>) {
    super(props);
  }

  validate(): void {
    process.cwd();
  }
}

const pr = new PreviewMembers({
  userIds: ['d88b10ef-eee3-4770-b20b-9df62445cd3e', '1e557fe3-cacc-4915-8ce1-b50a2dcdcc44'].map(
    (id) => new UserId(id),
  ),
});
const prop = new UserProps({
  previewMembers: pr,
});

const user = new UserComplexIdEntity({
  id: new UserComplexId({
    userId: new UserId('d88b10ef-eee3-4770-b20b-9df62445cd3e'),
    groupId: new GroupId('1e557fe3-cacc-4915-8ce1-b50a2dcdcc44'),
  }),
  props: prop,
  createdAt: CreatedAtValueObject.fromDateString('2022-10-06T08:54:55.584Z'),
  updatedAt: UpdatedAtValueObject.fromDateString('2022-10-06T08:54:55.584Z'),
  deletedAt: null,
});

export class UUID extends ValueObject<string> {
  public constructor(properties: ValueObjectProperties<string>) {
    super(properties);
  }

  validate(properties: ValueObjectProperties<string>) {}
}

export class PhoneNumber extends ValueObject<string[]> {
  public constructor(properties: ValueObjectProperties<string[]>) {
    super(properties);
  }

  public validate(properties: ValueObjectProperties<string[]>): void {}
}

export class Region extends ValueObject<string> {
  public constructor(properties: ValueObjectProperties<string>) {
    super(properties);
  }

  public validate(properties: ValueObjectProperties<string>): void {}
}
export type PhoneProperties = {
  phoneNumber: PhoneNumber;
  region: Region;
  nested?: PhoneProperties;
  vcl?: PhoneProperties[];
};

export class Phone extends ValueObject<PhoneProperties> {
  public constructor(properties: ValueObjectProperties<PhoneProperties>) {
    super(properties);
  }

  public validate(properties: ValueObjectProperties<PhoneProperties>) {}
}

const phone = new Phone({
  phoneNumber: new PhoneNumber({
    value: ['0869249714', '0869249714', '0869249714', '0869249714'],
  }),
  region: new Region({
    value: 'VN',
  }),
  nested: {
    phoneNumber: new PhoneNumber({
      value: ['0869249714', '0869249714', '0869249714', '0869249714'],
    }),
    region: new Region({
      value: 'VN',
    }),
    vcl: [
      {
        phoneNumber: new PhoneNumber({
          value: ['0869249714', '0869249714', '0869249714', '0869249714'],
        }),
        region: new Region({
          value: 'VN',
        }),
        nested: {
          phoneNumber: new PhoneNumber({
            value: ['0869249714', '0869249714', '0869249714', '0869249714'],
          }),
          region: new Region({
            value: 'VN',
          }),
          vcl: [],
        },
      },
    ],
  },
});

export type UserEntityProps = {
  phone: Phone;
};
export class UserEntity extends Entity<UUID, UserEntityProps> {
  protected _id: UUID;

  constructor(entityProps: EntityProps<UUID, UserEntityProps>) {
    super(entityProps);
    this._id = entityProps.id;
  }

  validate(): void {}
}

const user = new UserEntity({
  id: new UUID({ value: 'vvvvvvvvvv' }),
  props: {
    phone,
  },
  createdAt: null,
  updatedAt: null,
});

const userClone = user.clone();

// (userClone._id as any) = 'xxxxxxxxxx';

console.log(userClone);
// console.log(toPlainObject(JSON.stringify(prop.value)));
console.log(JSON.stringify(user.toObject(), null, 4));
// const user1 = new UserStringIdEntity({
//   id: UUIDValueObject.generate(),
//   props: {
//     username: ['Tanjiro'],
//     password: {
//       value: '123456',
//     },
//   },
//   createdAt: CreatedAtValueObject.fromDateString('2022-10-06T08:54:55.584Z'),
//   updatedAt: UpdatedAtValueObject.fromDateString('2022-10-06T08:54:55.584Z'),
//   deletedAt: null,
// });

// describe('Entity', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });
//
//   // describe('string id', () => {
//   //   it('should base on IdValueObject ', () => {
//   //     expect(user1.id).toBeInstanceOf(UUIDValueObject);
//   //   });
//   // });
//
//   describe('complex id', () => {
//     it('should base on ComplexIdValueObject ', () => {
//       expect(user.id).toBeInstanceOf(UserComplexId);
//     });
//   });
//
//   describe('toObject', () => {
//     it('should return plain object', () => {
//       const plainObject = user.toObject();
//
//       expect(isPlainObject(plainObject)).toBe(true);
//
//       expect(plainObject).toEqual({
//         id: {
//           userId: 'd88b10ef-eee3-4770-b20b-9df62445cd3e',
//           groupId: '1e557fe3-cacc-4915-8ce1-b50a2dcdcc44',
//         },
//         username: ['Tanjiro'],
//         password: '123456',
//         createdAt: new Date('2022-10-06T08:54:55.584Z'),
//         updatedAt: new Date('2022-10-06T08:54:55.584Z'),
//         deletedAt: null,
//       });
//     });
//   });
//
//   describe('props', () => {
//     it('should return read only props', () => {
//       const props = user.entityProps;
//       try {
//         props.id = null;
//       } catch (ex) {
//         expect(ex).toBeInstanceOf(TypeError);
//       }
//
//       expect(props).toEqual({
//         id: {
//           props: {
//             userId: { value: 'd88b10ef-eee3-4770-b20b-9df62445cd3e' },
//             groupId: { value: '1e557fe3-cacc-4915-8ce1-b50a2dcdcc44' },
//           },
//         },
//         props: { username: { value: 'Tanjiro' }, password: { value: '123456' } },
//         createdAt: { props: { value: new Date('2022-10-06T08:54:55.584Z') } },
//         updatedAt: { props: { value: new Date('2022-10-06T08:54:55.584Z') } },
//         deletedAt: null,
//       });
//     });
//   });
//
//   describe('clone', () => {
//     it('should return new instance', () => {
//       user.id;
//       const plainObject = user.clone<UserComplexIdEntity>();
//
//       console.log(plainObject.entityProps);
//
//       expect(plainObject).toBeInstanceOf(UserComplexIdEntity);
//       expect(isPlainObject(plainObject)).toBe(true);
//
//       expect(plainObject).toEqual({
//         id: {
//           userId: 'd88b10ef-eee3-4770-b20b-9df62445cd3e',
//           groupId: '1e557fe3-cacc-4915-8ce1-b50a2dcdcc44',
//         },
//         username: 'Tanjiro',
//         password: '123456',
//         createdAt: new Date('2022-10-06T08:54:55.584Z'),
//         updatedAt: new Date('2022-10-06T08:54:55.584Z'),
//         deletedAt: null,
//       });
//     });
//   });
// });
