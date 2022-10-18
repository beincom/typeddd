import { AsyncLocalStorage } from 'async_hooks';
import { Sequelize } from 'sequelize';

export interface IRequest {
  id: string;
}

export interface IResponse {
  id: string;
}

export class RequestContext<RQ extends IRequest = IRequest, RS extends IResponse = IResponse> {
  public static cls = new AsyncLocalStorage<RequestContext>();

  public static currentContext(): RequestContext {
    return this.cls.getStore();
  }

  public constructor(public readonly req: RQ, public readonly res: RS) {}

  public connection: any;
}
