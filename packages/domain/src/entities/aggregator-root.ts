import { Entity } from './entity';
import { DomainEvents } from '../events';
import { UUIDValueObject } from '../value-objects';
import { IDomainEvent } from '../interfaces/domain';

export abstract class AggregateRoot<
  AggregateRootId extends UUIDValueObject = UUIDValueObject,
  AggregateRootProps = any,
> extends Entity<AggregateRootId, AggregateRootProps> {
  public _id: AggregateRootId;

  private _domainEvents: IDomainEvent<unknown>[] = [];

  public get domainEvents(): IDomainEvent<unknown>[] {
    return this._domainEvents;
  }

  public addEvent(domainEvent: IDomainEvent<unknown>): void {
    DomainEvents.prepareForPublish(this);
    this._domainEvents.push(domainEvent);
  }

  public clearEvents(): void {
    this._domainEvents = [];
  }
}
