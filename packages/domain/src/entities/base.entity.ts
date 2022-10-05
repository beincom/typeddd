import {
  IdValueObject,
  DeletedAtValueObject,
  CreatedAtValueObject,
  UpdatedAtValueObject,
  DateValueObject,
} from '../value-objects';
import { ValueObjectFactory } from '../factories';
import { domainObjectToPlainObject } from '../utils';
import { deepCopy, isNull, isUndefined } from '@typeddd/common';
import { DefaultEntityProps } from '../interfaces/domain';

export type FullProps<T> = DefaultEntityProps<T>;

export abstract class BaseEntity<EntityProps> {
  /**
   * Override id if need
   */
  protected abstract _id: IdValueObject;

  private readonly _props: EntityProps;

  private readonly _createdAt: CreatedAtValueObject;

  private readonly _updatedAt: UpdatedAtValueObject;

  private readonly _deletedAt: UpdatedAtValueObject;

  protected constructor(entityProps: FullProps<EntityProps>) {
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

  public static isDomainEntity<Entity extends BaseEntity<unknown>>(
    entity: Entity,
  ): entity is Entity {
    // eslint-disable-next-line no-prototype-builtins
    return BaseEntity.prototype.isPrototypeOf(entity);
  }

  public toObject<T>(): T {
    const plainProps = domainObjectToPlainObject(this._props);

    const result = {
      id: this._id.value,
      ...plainProps,
      createdAt: this._createdAt.value,
      updatedAt: this._updatedAt.value,
    };
    return Object.freeze(result) as unknown as T;
  }

  public equals(object?: BaseEntity<EntityProps>): boolean {
    if (isNull(object) || isUndefined(object)) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!BaseEntity.isDomainEntity(object)) {
      return false;
    }

    return this.id ? this.id.equals(object.id) : false;
  }

  public get id(): IdValueObject {
    return this._id;
  }

  private set id(id: IdValueObject) {
    this._id = id;
  }

  public get props(): EntityProps {
    const copyProps = deepCopy(this._props);
    return Object.freeze(copyProps);
  }

  public get allProps(): FullProps<EntityProps> {
    const copyProps = deepCopy({
      id: this._id,
      props: this._props,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      deletedAt: this._deletedAt,
    });

    return Object.freeze(copyProps);
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
