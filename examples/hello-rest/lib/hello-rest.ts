export const url = '/hello-rest/:name'
export const method = 'GET'

type Request = {
    params: {
        name: string
    },
    options: {}
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

export const config = {
    HOSTNAME: 'localhost',
    NODE_ENV: 'dev',
    ANSWER_TO_EVERYTHING: undefined as string | undefined
}

export const actions = {
    async doSomethingDangerous(name: string): Promise<string> {
        return `It worked ${name}`;
    }
}

export const handler = async (
    req: Request,
    cfg: typeof config,
    act: typeof actions
): Promise<Result> => {
    const {
        params: {
            name
        }
    } = req

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
        }
    } catch (err) {
        return {
            status: 500,
            body: {
                errors: [err.message]
            }
        }
    }
}
