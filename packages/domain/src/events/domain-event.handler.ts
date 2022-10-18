import { IDomainEvent } from '../interfaces/domain';

export interface IDomainEventHandler {
  handle(event: IDomainEvent<unknown>): Promise<void> | void;
}

export abstract class DomainEventHandler implements IDomainEventHandler {
  public abstract handle(event: IDomainEvent<unknown>): Promise<void> | void;
}
