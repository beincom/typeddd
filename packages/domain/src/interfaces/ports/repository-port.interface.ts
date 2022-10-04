import { DeepPartial } from '@typeddd/common';
import { BaseValueObject } from '../../value-objects';
import { BaseEntity } from '../../entities/base.entity';
import { BaseEntityProps } from '../domain/entity.interfaces';
import { UUIDValueObject } from '../../value-objects/uuid.value-object';

export type ID<V extends UUIDValueObject = UUIDValueObject> = V;

export interface Command<Entity, EntityProps> {
  create(entity: Entity): Promise<Entity> | never;
  update(id: ID<any>, entity: Entity): Promise<Entity> | never;
  bulkCreate(entities: Entity[]): Promise<Entity[]> | never;
  bulkUpdate(entities: Entity[]): Promise<Entity[]> | never;
  remove(entities: Entity[]): Promise<boolean> | never;
  destroy(props: EntityProps): Promise<number> | never;
}

export type QueryParams<EntityProps> = DeepPartial<EntityProps & BaseEntityProps>;

export type OrderBy = 'DESC' | 'ASC';

export interface FindParams<EntityProps> {
  params?: QueryParams<EntityProps>;
  pagination?: PaginationParams;
  orderBy?: OrderBy;
}

export interface PaginationParams {
  skip?: number;
  limit?: number;
  page?: number;
}

export interface DataWithPaginationMeta<T> {
  data: T;
  count: number;
  offset?: number;
  limit?: number;
  page?: number;
}

export interface Query<Entity, EntityProps> {
  find(options: FindParams<EntityProps>): Promise<DataWithPaginationMeta<Entity[]>>;
  findById(id: ID<any>): Promise<Entity> | never;
  findOne(params: QueryParams<EntityProps>): Promise<Entity> | never;
}

export interface RepositoryPort<
  Entity extends BaseEntity<any>,
  EntityProps extends BaseValueObject<any>,
> extends Command<Entity, EntityProps>,
    Query<Entity, EntityProps> {}
