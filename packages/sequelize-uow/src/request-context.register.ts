import { IRequest, IResponse, RequestContext } from './request-context';

export function registerRequestContext(req: IRequest, res: IResponse, next: () => void) {
  RequestContext.cls.run(new RequestContext(req, res), next);
}
