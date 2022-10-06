import {
  DeletedAtValueObject,
  CreatedAtValueObject,
  UpdatedAtValueObject,
  DateValueObject,
} from '../value-objects';
import { FullProps, ID } from '../interfaces/domain';
import { ValueObjectFactory } from '../factories';
import { domainObjectToPlainObject } from '../utils';
import { deepCopy, isNull, isUndefined, deepEqual } from '@typeddd/common';

export abstract class BaseEntity<EntityIdProps, EntityProps> {
  /**
   * Override id if need
   */
  protected abstract _id: ID<EntityIdProps>;

  private readonly _props: EntityProps;

  private readonly _createdAt: CreatedAtValueObject;

  private readonly _updatedAt: UpdatedAtValueObject;

  private readonly _deletedAt: UpdatedAtValueObject;

  protected constructor(entityProps: FullProps<EntityIdProps, EntityProps>) {
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

  public static isDomainEntity<Entity extends BaseEntity<unknown, unknown>>(
    entity: Entity,
  ): entity is Entity {
    // eslint-disable-next-line no-prototype-builtins
    return BaseEntity.prototype.isPrototypeOf(entity);
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

  public equals(object?: BaseEntity<EntityIdProps, EntityProps>): boolean {
    if (isNull(object) || isUndefined(object)) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!BaseEntity.isDomainEntity(object)) {
      return false;
    }

    return this.id ? deepEqual(this.id, object.id) : false;
  }

  public get id(): ID<EntityIdProps> {
    return this._id;
  }

  private set id(id: ID<EntityIdProps>) {
    this._id = id;
  }

  public get props(): FullProps<EntityIdProps, EntityProps> {
    const copyProps = deepCopy({
      id: this._id,
      props: this._props,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      deletedAt: this._deletedAt,
    });

    return Object.freeze(copyProps);
  }

  public clone(): BaseEntity<EntityIdProps, EntityProps> {
    return (<T>(instance: T): T => {
      const copy = new (instance.constructor as { new (): T })();
      Object.assign(copy, deepCopy(instance));
      return copy;
    })(this);
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
