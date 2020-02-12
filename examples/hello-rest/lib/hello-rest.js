"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.url = '/hello-rest/:name';
exports.method = 'GET';
exports.schema = {
    response: {
        200: {
            type: 'object',
            properties: {
                greetings: {
                    type: 'string'
                }
            }
        },
        500: {
            type: 'object',
            properties: {
                errors: {
                    type: 'array',
                    items: {
                        type: 'string'
                    }
                }
            }
        }
    }
};
exports.defaultConfig = {
    HOSTNAME: 'localhost',
    NODE_ENV: 'dev',
    ANSWER_TO_EVERYTHING: undefined
};
exports.defaultManagers = {
    DO_SOMETHING_DANGEROUS: async (query) => {
        console.log({ query });
        return 'It worked!';
    },
    GET_STATE: async () => 'beep!',
    SLEEP: (n) => {
        return new Promise((resolve, _reject) => {
            setTimeout(() => resolve(n), n);
        });
    },
};
exports.handler = async (request, config, managers) => {
    const { params: { name } } = request;
    const result = await managers.DO_SOMETHING_DANGEROUS({ foo: 'bar' });
    const answer = `The answer to everything is ${config.ANSWER_TO_EVERYTHING}`;
    const greetings = `${result}. ${answer}`;
    console.log({ config, name });
    try {
        return {
            status: 200,
            headers: {
                ['powered-by']: 'frameless'
            },
            body: {
                greetings,
            }
        };
    }
    catch (err) {
        return {
            status: 500,
            body: {
                errors: [err.message],
            }
        };
    }
};
//# sourceMappingURL=hello-rest.js.map