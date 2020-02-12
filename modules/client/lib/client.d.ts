import { RouteSchema, RestRequest } from '@frameless/rest';
declare type Route = {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    schema: RouteSchema<object>;
};
export declare const createRouteClient: (baseUrl: string, route: Route) => <Req>(req: Req extends RestRequest<infer Q, infer P, infer H, infer B> ? Req : never) => import("axios").AxiosPromise<any>;
export {};
//# sourceMappingURL=client.d.ts.map