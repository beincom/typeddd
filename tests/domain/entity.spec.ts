import {
  CreatedAtValueObject,
  ValueObjectProps,
  ComplexIdValueObject,
  UpdatedAtValueObject,
  UUIDValueObject,
} from '../../packages/domain/src/value-objects';
import { FullProps } from '../../packages/domain/src/interfaces/domain';
import { BaseEntity } from '../../packages/domain/src/entities/base.entity';
import { isPlainObject } from '../../packages/common/src/utils/shared.utils';

type UserProps = {
  username: ValueObjectProps<string>;
  password: ValueObjectProps<string>;
};

type UserIdProps = {
  userId: ValueObjectProps<string>;
  groupId: ValueObjectProps<string>;
};

class UserComplexId extends ComplexIdValueObject<UserIdProps> {
  public constructor(props: UserIdProps) {
    super(props);
  }

  validate(props: ValueObjectProps<UserIdProps>): void {
    process.cwd();
  }
}

class UserComplexIdEntity extends BaseEntity<UserIdProps, UserProps> {
  protected _id: UserComplexId;

  public constructor(props: FullProps<UserIdProps, UserProps>) {
    super(props);
  }

  validate(): void {
    process.cwd();
  }
}

class UserStringIdEntity extends BaseEntity<UUIDValueObject, UserProps> {
  protected _id: UUIDValueObject;

  public constructor(props: FullProps<UUIDValueObject, UserProps>) {
    super(props);
  }

  validate(): void {
    process.cwd();
  }
}

const user = new UserComplexIdEntity({
  id: new UserComplexId({
    userId: {
      value: 'd88b10ef-eee3-4770-b20b-9df62445cd3e',
    },
    groupId: {
      value: '1e557fe3-cacc-4915-8ce1-b50a2dcdcc44',
    },
  }),
  props: {
    username: {
      value: 'Tanjiro',
    },
    password: {
      value: '123456',
    },
  },
  createdAt: CreatedAtValueObject.fromDateString('2022-10-06T08:54:55.584Z'),
  updatedAt: UpdatedAtValueObject.fromDateString('2022-10-06T08:54:55.584Z'),
  deletedAt: null,
});

const user1 = new UserStringIdEntity({
  id: UUIDValueObject.generate(),
  props: {
    username: {
      value: 'Tanjiro',
    },
    password: {
      value: '123456',
    },
  },
  createdAt: CreatedAtValueObject.fromDateString('2022-10-06T08:54:55.584Z'),
  updatedAt: UpdatedAtValueObject.fromDateString('2022-10-06T08:54:55.584Z'),
  deletedAt: null,
});

describe('Entity', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('string id', () => {
    it('should base on IdValueObject ', () => {
      expect(user1.id).toBeInstanceOf(UUIDValueObject);
    });
  });

  describe('complex id', () => {
    it('should base on ComplexIdValueObject ', () => {
      expect(user.id).toBeInstanceOf(UserComplexId);
    });
  });

  describe('toObject', () => {
    it('should return plain object', () => {
      const plainObject = user.toObject();

      expect(isPlainObject(plainObject)).toBe(true);

      expect(plainObject).toEqual({
        id: {
          userId: 'd88b10ef-eee3-4770-b20b-9df62445cd3e',
          groupId: '1e557fe3-cacc-4915-8ce1-b50a2dcdcc44',
        },
        username: 'Tanjiro',
        password: '123456',
        createdAt: new Date('2022-10-06T08:54:55.584Z'),
        updatedAt: new Date('2022-10-06T08:54:55.584Z'),
        deletedAt: null,
      });
    });
  });

  describe('props', () => {
    it('should return read only props', () => {
      const props = user.props;

      try {
        props.id = null;
      } catch (ex) {
        expect(ex).toBeInstanceOf(TypeError);
      }

      expect(props).toEqual({
        id: {
          props: {
            userId: { value: 'd88b10ef-eee3-4770-b20b-9df62445cd3e' },
            groupId: { value: '1e557fe3-cacc-4915-8ce1-b50a2dcdcc44' },
          },
        },
        props: { username: { value: 'Tanjiro' }, password: { value: '123456' } },
        createdAt: { props: { value: new Date('2022-10-06T08:54:55.584Z') } },
        updatedAt: { props: { value: new Date('2022-10-06T08:54:55.584Z') } },
        deletedAt: null,
      });
    });
  });
});
