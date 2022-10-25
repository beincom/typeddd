import {
  CreatedAtValueObject,
  ValueObjectProps,
  ComplexIdValueObject,
  UpdatedAtValueObject,
  UUIDValueObject,
} from '../../packages/domain/src/value-objects';
import { EntityProps } from '../../packages/domain/src/interfaces/domain';
import { Entity } from '../../packages/domain/src/entities/entity';
import { ValueObject } from '../../packages/domain';

type UserProps = {
  previewMembers: PreviewMembers;
};

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

class UserComplexId extends ComplexIdValueObject<UserIdProps> {
  public constructor(props: UserIdProps) {
    super(props);
  }

  validate(props: ValueObjectProps<UserIdProps>): void {
    process.cwd();
  }
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
const user = new UserComplexIdEntity({
  id: new UserComplexId({
    userId: new UserId('d88b10ef-eee3-4770-b20b-9df62445cd3e'),
    groupId: new GroupId('1e557fe3-cacc-4915-8ce1-b50a2dcdcc44'),
  }),
  props: {
    previewMembers: pr,
  },
  createdAt: CreatedAtValueObject.fromDateString('2022-10-06T08:54:55.584Z'),
  updatedAt: UpdatedAtValueObject.fromDateString('2022-10-06T08:54:55.584Z'),
  deletedAt: null,
});
console.log(pr.value);
// console.log(JSON.stringify(user.toObject(), null, 4));
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
