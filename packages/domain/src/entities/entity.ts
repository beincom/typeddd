import {
  DeletedAtValueObject,
  CreatedAtValueObject,
  UpdatedAtValueObject,
  DateValueObject,
  ValueObject,
} from '../value-objects';
import { EntityProps } from '../interfaces/domain';
import { ValueObjectFactory } from '../factories';
import { domainObjectToPlainObject } from '../utils';
import { isNull, isUndefined, deepEqual, RuntimeException } from '@beincom/common';

export type CloneType<T> = T extends Entity<any, any> ? T : any;

export abstract class Entity<Identity extends ValueObject<string | any>, Props> {
  /**
   * Override id if need
   */
  protected abstract _id: Identity;

  private readonly _props: Props;

  private readonly _createdAt: CreatedAtValueObject;

  private readonly _updatedAt: UpdatedAtValueObject;

  private readonly _deletedAt?: UpdatedAtValueObject;

  protected constructor(entityProps: EntityProps<Identity, Props>) {
    const { id, props, createdAt, updatedAt, deletedAt } = entityProps;

    this.id = id;

    const nowValue = ValueObjectFactory.create<DateValueObject, Date>(DateValueObject, new Date());

    this._createdAt = createdAt || CreatedAtValueObject.fromPrototype(nowValue);

    this._updatedAt = updatedAt || UpdatedAtValueObject.fromPrototype(nowValue);

    this._deletedAt = deletedAt || null;

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
      id: this._id.value,
      ...this._props,
      createdAt: this._createdAt.value,
      updatedAt: this._updatedAt.value,
      deletedAt: this._deletedAt?.value || null,
    };
    const plainProps = domainObjectToPlainObject(result);

    return plainProps as unknown as T;
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

  private set id(id: Identity) {
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

  public clone<T>(): CloneType<T> {
    const prototype = Reflect.getPrototypeOf(this);

    if (prototype) {
      const argsCtor: EntityProps<Identity, Props> = {
        id: this._id,
        props: this._props,
        createdAt: this._createdAt,
        updatedAt: this._updatedAt,
        deletedAt: this._deletedAt,
      };
      return Reflect.construct(prototype.constructor, [argsCtor]);
    }
    throw new RuntimeException(`Can't get prototype of entity`);
  }

  public get createdAt(): CreatedAtValueObject {
    return this._createdAt;
  }

  public get updatedAt(): UpdatedAtValueObject {
    return this._updatedAt;
  }

  public get deletedAt(): DeletedAtValueObject {
    return this._deletedAt;
  }
}
