import { Entity } from './entity';
import { UUID } from '../value-objects';
import { clone } from '@beincom/common';
import { DomainEvents } from '../events';
import { EntityProps, IDomainEvent } from '../interfaces/domain';

export abstract class AggregateRoot<
  AggregateRootId extends UUID = UUID,
  AggregateRootProps = any,
> extends Entity<AggregateRootId, AggregateRootProps> {
  public abstract _id: AggregateRootId;
  private _domainEvents: IDomainEvent<unknown>[];

  protected constructor(
    entityProps: EntityProps<AggregateRootId, AggregateRootProps>,
    domainEvent: IDomainEvent<unknown>[],
  ) {
    super(entityProps);
    this._domainEvents = domainEvent;
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

  public clone() {
    const entityProps: EntityProps<AggregateRootId, AggregateRootProps> = {
      id: this._id,
      props: this._props,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      deletedAt: this._deletedAt,
    };

    const domainEvents: IDomainEvent<unknown>[] = this._domainEvents;

    return clone<this>(this, [entityProps, domainEvents]);
  }
}
