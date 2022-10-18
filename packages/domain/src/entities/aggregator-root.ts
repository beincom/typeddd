import { BaseEntity } from './base.entity';
import { UUIDValueObject } from '../value-objects';
import { IDomainEvent } from '../interfaces/domain/event.interfaces';
import { DomainEvents } from '../events';

export abstract class AggregateRoot<
  AggregateRootId extends UUIDValueObject = UUIDValueObject,
  AggregateRootProps = any,
> extends BaseEntity<AggregateRootId, AggregateRootProps> {
  public _id: AggregateRootId;

  private _domainEvents: IDomainEvent<unknown>[] = [];

  public get domainEvents(): IDomainEvent<unknown>[] {
    return this._domainEvents;
  }

  protected addEvent(domainEvent: IDomainEvent<unknown>): void {
    DomainEvents.prepareForPublish(this);
    this._domainEvents.push(domainEvent);
  }

  public clearEvents(): void {
    this._domainEvents = [];
  }
}
