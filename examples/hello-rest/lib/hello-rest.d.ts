export declare const url = "/hello-rest/:name";
export declare const method = "GET";
declare type Request = {
    params: {
        name: string;
    };
    options: {};
};
declare type Reply = {
    status: 200 | 500;
    headers?: {
        ['powered-by']: 'morphic';
    };
    body?: {
        greetings: {
            direct: string;
            client: string;
        };
    };
};
export declare const handler: (req: Request) => Promise<Reply>;
export declare const schema: {
    response: {
        200: {
            type: string;
            properties: {
                greetings: {
                    type: string;
                    properties: {
                        direct: {
                            type: string;
                        };
                        client: {
                            type: string;
                        };
                    };
                };
            };
        };
    };
};
export {};
//# sourceMappingURL=hello-rest.d.ts.map