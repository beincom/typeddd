import { Entity } from './entity';
import { DomainEvents } from '../events';
import { UUID } from '../value-objects';
import { IDomainEvent } from '../interfaces/domain';

export abstract class AggregateRoot<
  AggregateRootId extends UUID = UUID,
  AggregateRootProps = any,
> extends Entity<AggregateRootId, AggregateRootProps> {
  public abstract _id: AggregateRootId;

  private _domainEvents: IDomainEvent<unknown>[] = [];

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
}
