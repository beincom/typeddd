import { generateUUID } from '@typeddd/common';
import { IRequest, IResponse, RequestContext } from './request-context';

export function registerRequestContext(req: IRequest, res: IResponse, next: () => void) {
  req.id = generateUUID();
  RequestContext.cls.run(new RequestContext(req, res), next);
}
