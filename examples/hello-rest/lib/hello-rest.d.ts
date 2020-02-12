export declare const url = "/hello-rest/:name";
export declare const method = "GET";
declare type Request = {
    params: {
        name: string;
    };
};
declare type Result = {
    status: 200;
    headers: {
        ['powered-by']: 'frameless';
    };
    body: {
        greetings: string;
    };
} | {
    status: 500;
    body: {
        errors: string[];
    };
};
export declare const schema: {
    response: {
        200: {
            type: string;
            properties: {
                greetings: {
                    type: string;
                };
            };
        };
        500: {
            type: string;
            properties: {
                errors: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
            };
        };
    };
};
export declare const defaultConfig: {
    HOSTNAME: string;
    NODE_ENV: string;
    ANSWER_TO_EVERYTHING: string | undefined;
};
export declare const defaultManagers: {
    DO_SOMETHING_DANGEROUS: (query: {
        foo: string;
    }) => Promise<string>;
    GET_STATE: () => Promise<string>;
    SLEEP: (n: number) => Promise<number>;
};
export declare const handler: (request: Request, config: {
    HOSTNAME: string;
    NODE_ENV: string;
    ANSWER_TO_EVERYTHING: string | undefined;
}, managers: {
    DO_SOMETHING_DANGEROUS: (query: {
        foo: string;
    }) => Promise<string>;
    GET_STATE: () => Promise<string>;
    SLEEP: (n: number) => Promise<number>;
}) => Promise<Result>;
export {};
//# sourceMappingURL=hello-rest.d.ts.map