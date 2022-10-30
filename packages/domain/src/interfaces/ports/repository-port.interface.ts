import { DeepPartial } from '@beincom/common';
import { Entity } from '../../entities';
import { EntityProps } from '../domain';

export interface Command<Entity, EntityProps> {
  create(entity: Entity): Promise<Entity> | never;
  update(id: any, entity: Entity): Promise<Entity> | never;
  bulkCreate(entities: Entity[]): Promise<Entity[]> | never;
  bulkUpdate(entities: Entity[]): Promise<Entity[]> | never;
  remove(entities: Entity[]): Promise<boolean> | never;
  destroy(props: EntityProps): Promise<number> | never;
}

export type QueryParams<Props> = DeepPartial<EntityProps<any, Props>>;

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
  findById(id: any): Promise<Entity> | never;
  findOne(params: QueryParams<EntityProps>): Promise<Entity> | never;
}

export interface RepositoryPort<E extends Entity<any, EntityProps>, EntityProps>
  extends Command<E, EntityProps>,
    Query<E, EntityProps> {}
