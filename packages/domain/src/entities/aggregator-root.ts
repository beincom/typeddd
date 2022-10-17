import { BaseEntity } from './base.entity';
import { UUIDValueObject } from '../value-objects';
import { IDomainEvent } from '../interfaces/domain/event.interfaces';

export abstract class AggregateRoot<
  AggregateRootId extends UUIDValueObject,
  AggregateRootProps,
> extends BaseEntity<AggregateRootId, AggregateRootProps> {
  public _id: AggregateRootId;

  private _domainEvents: IDomainEvent<unknown>[] = [];

  public get domainEvents(): IDomainEvent<unknown>[] {
    return this._domainEvents;
  }

  protected addEvent(domainEvent: IDomainEvent<unknown>): void {
    this._domainEvents.push(domainEvent);
  }

  public clearEvents(): void {
    this._domainEvents = [];
  }
}
