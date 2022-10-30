import { EntityProps } from '../interfaces/domain';
import { valueObjectToPlain } from '../utils/domain.utils';
import { isNull, isUndefined, deepEqual, DeepPartial, clone } from '@beincom/common';
import { ID, DateVO, CreatedAt, UpdatedAt, DeletedAt, ValueObject } from '../value-objects';

export type ValueObjects<T> = {
  [index: string]: ValueObject<T> | ValueObject<T>[];
};

export type EntityProperties<T> = {
  [K in keyof T]:
    | ValueObject<T>
    | ValueObject<T>[]
    | ValueObjects<T>
    | DeepPartial<EntityProperties<T>>;
};

export abstract class Entity<
  Identity extends ID = ID,
  Props extends EntityProperties<unknown> = EntityProperties<unknown>,
> {
  protected abstract _id: Identity;

  private readonly _props: Props;

  private readonly _createdAt: CreatedAt;

  private readonly _updatedAt: UpdatedAt;

  private readonly _deletedAt?: DeletedAt;

  protected constructor(entityProps: EntityProps<Identity, Props>) {
    const { id, props, createdAt, updatedAt, deletedAt } = entityProps;

    this.id = id;
    const nowValue = new DateVO(new Date());
    this._createdAt = createdAt || CreatedAt.fromPrototype(nowValue);
    this._updatedAt = updatedAt || UpdatedAt.fromPrototype(nowValue);
    this._deletedAt = deletedAt || new DeletedAt(null);
    this._props = props;

    this.validate();
  }

  public abstract validate(): void | never;

  public static isDomainEntity<E extends Entity<any, any>>(entity: E): entity is E {
    // eslint-disable-next-line no-prototype-builtins
    return Entity.prototype.isPrototypeOf(entity);
  }

  public toObject<T>(): T {
    const result = {
      id: this._id,
      ...this._props,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      deletedAt: this._deletedAt || null,
    };

    return valueObjectToPlain<T>(result) as unknown as T;
  }

  public equals(object?: Entity<Identity, Props>): boolean {
    if (isNull(object) || isUndefined(object)) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!Entity.isDomainEntity(object)) {
      return false;
    }

    return this.id ? deepEqual(this.id, object.id) : false;
  }

  public get id(): Identity {
    return this._id;
  }

  protected set id(id: Identity) {
    this._id = id;
  }

  public get entityProps(): EntityProps<Identity, Props> {
    const copyProps = {
      id: this._id,
      props: this._props,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      deletedAt: this._deletedAt,
    };

    return Object.freeze(copyProps);
  }

  public clone(): this {
    const argsCtor: EntityProps<Identity, Props> = {
      id: this._id,
      props: this._props,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      deletedAt: this._deletedAt,
    };

    return clone(this, argsCtor);
  }

  public get createdAt(): CreatedAt {
    return this._createdAt;
  }

  public get updatedAt(): UpdatedAt {
    return this._updatedAt;
  }

  public get deletedAt(): DeletedAt {
    return this._deletedAt;
  }
}
