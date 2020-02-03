import * as direct from '@morphic-examples/hello-rpc'
// import * as client from '@morphic-examples/rpc-client';

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
        ['powered-by']: 'morphic'
    },
    body: {
        greetings: {
            direct: string
        }
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
                    type: 'object',
                    properties: {
                        direct: {
                            type: 'string'
                        },
                        client: {
                            type: 'string'
                        }
                    }
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
    NODE_ENV: 'development',
}

export const handler = async (req: Request, cfg: typeof config): Promise<Result> => {
    console.log({ cfg })

    try {
        const directResult = await direct.helloRpc(
            req.params.name
        );

        // const clientResult = await client.helloRpc(
        // req.params.name
        // );

        return {
            status: 200,
            headers: {
                ['powered-by']: 'morphic'
            },
            body: {
                greetings: {
                    direct: directResult,
                    // client: clientResult
                }
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
