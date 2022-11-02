import { UUID } from '../value-objects';
import { DomainEvents } from '../events';
import { cloneEntityProps } from '../utils';
import { Entity, EntityProperties, EntitySetting } from './entity';
import { clone, deepCopy } from '@beincom/common';
import { EntityProps, IDomainEvent } from '../interfaces/domain';

export abstract class AggregateRoot<
  AggregateRootId extends UUID = UUID,
  AggregateRootProps extends EntityProperties<any> = any,
> extends Entity<AggregateRootId, AggregateRootProps> {
  protected abstract _id: AggregateRootId;
  protected _domainEvents: IDomainEvent<unknown>[];

  protected constructor(
    entityProps: EntityProps<AggregateRootId, AggregateRootProps>,
    domainEvents: IDomainEvent<unknown>[],
    setting: EntitySetting,
  ) {
    super(entityProps, setting);
    this._domainEvents = domainEvents;
  }

  public get domainEvents(): IDomainEvent<unknown>[] {
    return this._domainEvents;
  }

  public raiseEvent(domainEvent: IDomainEvent<unknown>): void {
    DomainEvents.prepareForPublish(this);
    this._domainEvents.push(domainEvent);
  }

  public cleanEvents(): void {
    this._domainEvents = [];
  }

  public clone<T extends Entity<AggregateRootId, AggregateRootProps> = this>(): T {
    const entityProps: EntityProps<AggregateRootId, AggregateRootProps> = {
      id: this._id,
      props: this._props,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      deletedAt: this._deletedAt,
    };
    const entityPropsClone = cloneEntityProps(this, entityProps);
    const domainEventsClone: IDomainEvent<unknown>[] = this._domainEvents.map((event) =>
      deepCopy(event),
    );
    const settingClone = { ...this._setting };
    return clone<T>(this, [entityPropsClone, domainEventsClone, settingClone]);
  }
}
