import { Injectable, Type } from '@nestjs/common';
import { Module } from '@nestjs/core/injector/module';
import { EVENTS_HANDLER_METADATA } from '../constants';
import { DomainEventHandler } from '@beincom/domain/src/events';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { ModulesContainer } from '@nestjs/core/injector/modules-container';

@Injectable()
export class ExplorerService {
  constructor(private readonly modulesContainer: ModulesContainer) {}

  public explore() {
    const modules = [...this.modulesContainer.values()];

    return this.flatMap(modules, (instance) =>
      ExplorerService.filterProvider(instance, EVENTS_HANDLER_METADATA),
    );
  }

  private flatMap<T extends DomainEventHandler = DomainEventHandler>(
    modules: Module[],
    callback: (instance: InstanceWrapper) => Type<any> | undefined,
  ): Type<T>[] {
    const items = modules
      .map((module) => [...module.providers.values()].map(callback))
      .reduce((a, b) => a.concat(b), []);
    return items.filter((element) => !!element) as Type<T>[];
  }

  private static filterProvider(
    wrapper: InstanceWrapper,
    metadataKey: string,
  ): Type<any> | undefined {
    const { instance } = wrapper;
    if (!instance) {
      return undefined;
    }
    return ExplorerService.extractMetadata(instance, metadataKey);
  }

  private static extractMetadata(instance: Record<string, any>, metadataKey: string): Type<any> {
    if (!instance.constructor) {
      return;
    }
    const metadata = Reflect.getMetadata(metadataKey, instance.constructor);
    return metadata ? (instance.constructor as Type<any>) : undefined;
  }
}
