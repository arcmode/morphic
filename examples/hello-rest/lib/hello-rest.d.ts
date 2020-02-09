export declare const url = "/hello-rest/:name";
export declare const method = "GET";
declare type Request = {
    params: {
        name: string;
    };
    options: {};
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
export declare const config: {
    HOSTNAME: string;
    NODE_ENV: string;
    ANSWER_TO_EVERYTHING: string | undefined;
};
export declare const actions: {
    doSomethingDangerous(name: string): Promise<string>;
};
export declare const handler: (req: Request, cfg: {
    HOSTNAME: string;
    NODE_ENV: string;
    ANSWER_TO_EVERYTHING: string | undefined;
}, act: {
    doSomethingDangerous(name: string): Promise<string>;
}) => Promise<Result>;
export {};
//# sourceMappingURL=hello-rest.d.ts.map