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
exports.config = {
    HOSTNAME: 'localhost',
    NODE_ENV: 'dev',
    ANSWER_TO_EVERYTHING: undefined
};
exports.actions = {
    async doSomethingDangerous(name) {
        return `It worked ${name}`;
    }
};
exports.handler = async (req, cfg, act) => {
    const { params: { name } } = req;
    const result = await act.doSomethingDangerous(name);
    const answer = `The answer to everything is ${cfg.ANSWER_TO_EVERYTHING}`;
    const greetings = `${result}. ${answer}`;
    console.log({ cfg, name });
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
                errors: [err.message]
            }
        };
    }
};
//# sourceMappingURL=hello-rest.js.map