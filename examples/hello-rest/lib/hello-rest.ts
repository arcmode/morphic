export const url = '/hello-rest/:name'
export const method = 'GET'

type Request = {
    params: {
        name: string
    },
}

type Result = {
    status: 200,
    headers: {
        ['powered-by']: 'frameless'
    },
    body: {
        greetings: string
    }
} | {
    status: 500,
    body: {
        errors: string[]
    }
}

export const schema = {
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
}

export const defaultConfig = {
    HOSTNAME: 'localhost',
    NODE_ENV: 'dev',
    ANSWER_TO_EVERYTHING: undefined as string | undefined
}

export const defaultManagers = {
    DO_SOMETHING_DANGEROUS: async (query: { foo: string }) => {
        console.log({ query });
        return 'It worked!';
    },
    GET_STATE: async () => 'beep!',
    SLEEP: (n: number) => {
        return new Promise<number>((resolve, _reject) => {
            setTimeout(() => resolve(n), n);
        });
    },
}

export const handler = async (
    request: Request,
    config: typeof defaultConfig,
    managers: typeof defaultManagers,
): Promise<Result> => {
    const {
        params: {
            name
        }
    } = request;

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
        }
    } catch (err) {
        return {
            status: 500,
            body: {
                errors: [err.message],
            }
        }
    }
}
