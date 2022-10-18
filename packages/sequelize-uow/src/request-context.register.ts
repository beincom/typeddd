import { Sequelize } from 'sequelize';
import { generateUUID } from '@typeddd/common';
import { IRequest, IResponse, RequestContext } from './request-context';

export function registerRequestContext(
  req: IRequest,
  res: IResponse,
  next: () => void,
  conn?: Sequelize,
) {
  req.id = generateUUID();

  const requestCtx = new RequestContext(req, res);

  if (conn) {
    requestCtx.connection = conn;
  }
  RequestContext.cls.run(requestCtx, next);
}
