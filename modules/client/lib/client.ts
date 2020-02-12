import axios from 'axios';
import { RouteSchema, RestRequest } from '@frameless/rest';

type Route = {
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    schema: RouteSchema<object>
}

export const createRouteClient = (
    baseUrl: string,
    route: Route,
) => <Req>(
    req: Req extends RestRequest<infer Q, infer P, infer H, infer B>
        ? Req
        : never
) => axios({
    method: route.method,
    url: `${baseUrl}${route.url}`,
    headers: req.headers,
    data: req.body,
})
