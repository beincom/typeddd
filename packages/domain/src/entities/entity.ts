import { EntityProperty } from '../decorators';
import { cloneEntityProps, valueObjectToPlain } from '../utils/domain.utils';
import { isNull, isUndefined, deepEqual, DeepPartial, clone } from '@beincom/common';
import { EntityProps, GetterEntityProps, SetterEntityProps } from '../interfaces/domain';
import { ID, DateVO, CreatedAt, UpdatedAt, DeletedAt, ValueObject, UUID } from '../value-objects';
import { SetterNotAllowDomainException } from '../exceptions/setter-not-allow.domain.exception';

export type EntitySetting = {
  disablePropSetter?: boolean;
};

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
  Identity extends ID<any> = UUID,
  Props extends EntityProperties<any> = EntityProperties<any>,
> {
  /**
   * Abstract entity identity property.
   */
  protected abstract _id: Identity;

  /**
   * Entity property.
   */
  @EntityProperty()
  protected _props: Props;

  /**
   * Created at entity property.
   */
  protected _createdAt: CreatedAt;

  /**
   * Updated at entity property.
   */
  protected _updatedAt: UpdatedAt;

  /**
   * Deleted at entity property.
   */
  protected _deletedAt?: DeletedAt;

  /**
   * Snapshot plain of entity.
   */
  protected _snapshot: object;

  /**
   * Setting entity.
   * @protected
   */
  protected _setting: EntitySetting;

  protected constructor(entityProps: EntityProps<Identity, Props>, setting?: EntitySetting) {
    const { id, props, createdAt, updatedAt, deletedAt } = entityProps;
    this.id = id;
    const nowValue = new DateVO({ value: new Date() });
    this._createdAt = createdAt || CreatedAt.fromPrototype(nowValue);
    this._updatedAt = updatedAt || UpdatedAt.fromPrototype(nowValue);
    this._deletedAt = deletedAt || new DeletedAt({ value: null });
    this._props = props;
    this._setting = setting
      ? setting
      : {
          disablePropSetter: false,
        };
    this.validate();
    this.createSnapShot(this);
  }

  /**
   * Validate props when create new entity.
   */
  public abstract validate(): void | never;

  /**
   * Check target is entity.
   * @param target any
   */
  public static isDomainEntity(target: any): target is Entity {
    if (target === null || target === undefined) {
      return false;
    }
    // eslint-disable-next-line no-prototype-builtins
    return Entity.prototype.isPrototypeOf(target);
  }

  /**
   * Convert entity to plain object.
   */
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

  /**
   * Compare two entity.
   * @param target Entity<Identity, Props>
   * @return Boolean
   */
  public equals(target?: Entity<Identity, Props>): boolean {
    if (isNull(target) || isUndefined(target)) {
      return false;
    }

    if (!Entity.isDomainEntity(target)) {
      return false;
    }
    return deepEqual(this.toObject(), target.toObject());
  }

  /**
   * Check entity is changed props.
   * @return Boolean
   */
  public isChanged(): boolean {
    return !deepEqual(this.toObject(), this._snapshot);
  }

  /**
   * Clone new entity.
   * @return this
   */
  public clone<T extends Entity<Identity, Props> = this>(): T {
    const argsCtor: EntityProps<Identity, Props> = {
      id: this._id,
      props: this._props,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      deletedAt: this._deletedAt,
    };
    const argsCtorClone = cloneEntityProps(this, argsCtor);
    const settingClone = { ...this._setting };
    return clone<T>(this, [argsCtorClone, settingClone]);
  }

  /**
   * check props can edit
   * @protected
   */
  protected allowPropSetter() {
    if (this._setting?.disablePropSetter) {
      throw new SetterNotAllowDomainException(
        null,
        'Cant change props, modify disablePropsSetter or disableAllSetter of entity setting to allow setter',
      );
    }
  }

  /**
   * Get id.
   * @return Identity
   */
  public get id(): Identity {
    return this._id;
  }

  /**
   * Get all props of entity.
   * @return  EntityProps<Identity, Props>
   */
  public entityProps(): EntityProps<Identity, Props> {
    const copyProps = {
      id: this._id,
      props: this._props,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      deletedAt: this._deletedAt,
    };

    return Object.freeze(copyProps);
  }

  /**
   * Get created at.
   * @return CreatedAt;
   */
  public get createdAt(): CreatedAt {
    return this._createdAt;
  }

  /**
   * Get updated at.
   * @return UpdatedAt;
   */
  public get updatedAt(): UpdatedAt {
    return this._updatedAt;
  }

  /**
   * Get deleted at.
   * @return DeletedAt;
   */
  public get deletedAt(): DeletedAt {
    return this._deletedAt;
  }

  /**
   * Set id.
   * @param id Identity
   * @protected
   */
  protected set id(id: Identity) {
    this._id = id;
  }

  /**
   * Get entity property by key.
   * @param key T extends keyof Props
   * @return  Props[T]
   */
  public get<K extends keyof GetterEntityProps<Identity, Props>>(
    key: K,
  ): GetterEntityProps<Identity, Props>[K] {
    if (Object.keys(this._props).includes(key as string)) {
      return this._props[key] as unknown as GetterEntityProps<Identity, Props>[K];
    }
    return this[`_${key as string}`];
  }

  /**
   * Change property of entity by property key.
   * @param key T extends keyof Props
   * @param value  Props[T]
   */
  public set<T extends keyof SetterEntityProps<Identity, Props>>(
    key: T,
    value: SetterEntityProps<Identity, Props>[T],
  ): void;

  /**
   * Change property of entity by Partial<Props>.
   * @param props Partial<Props>
   */
  public set(props: Partial<SetterEntityProps<Identity, Props>>): void;

  /**
   * Change entity props.
   * @param args
   */
  public set(...args: any[]): void {
    this.allowPropSetter();

    if (args.length === 1) {
      const [props]: Partial<SetterEntityProps<Identity, Props>>[] = args;
      for (const [key, value] of Object.entries(props)) {
        if (Object.keys(this._props).includes(key)) {
          this._props = { ...this._props, [key]: value };
        } else {
          this[`_${key}`] = value;
        }
      }
    } else {
      const [key, value] = args;

      if (Object.keys(this._props).includes(key)) {
        this._props = { ...this._props, [key]: value };
      } else {
        this[`_${key}`] = value;
      }
    }
  }

  /**
   * Create snapshot of entity.
   * @param target  Entity
   * @protected
   */
  protected createSnapShot(target: Entity<Identity, Props>) {
    if (!this._snapshot) {
      this._snapshot = target.toObject();
    }
  }

  /**
   * Get snapshot of entity.
   * @return T;
   */
  public getSnapshot<T>(): T {
    return this._snapshot as unknown as T;
  }
}
