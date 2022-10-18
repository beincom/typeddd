import { EventBus } from './event-bus';
import { ExplorerService } from './services/explorer.service';
import { Module, OnApplicationBootstrap } from '@nestjs/common';

@Module({
  providers: [ExplorerService, EventBus],
  exports: [],
})
export class DomainEventModule implements OnApplicationBootstrap {
  constructor(
    private readonly explorerService: ExplorerService,
    private readonly eventBus: EventBus,
  ) {}

  public onApplicationBootstrap() {
    const events = this.explorerService.explore();
    this.eventBus.register(events);
  }
}
