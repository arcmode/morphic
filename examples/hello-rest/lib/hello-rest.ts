import * as direct from '@morphic-examples/hello-rpc';
import * as client from '@morphic-examples/rpc-client';

export const url = '/hello-rest/:name';
export const method = 'GET';

type Request = {
    params: {
        name: string
    },
    options: {}
}

type Reply = {
    status: 200 | 500,
    headers?: {
        ['powered-by']: 'morphic'
    },
    body?: {
        greetings: {
            direct: string,
            client: string
        }
    }
};

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
        }
    }
}

export const handler = async function(req: Request): Promise<Reply> {
    try {
        const directResult = await direct.helloRpc(
            req.params.name
        );

        const clientResult = await client.helloRpc(
            req.params.name
        );

        return {
            status: 200,
            headers: {
                ['powered-by']: 'morphic'
            },
            body: {
                greetings: {
                    direct: directResult,
                    client: clientResult
                }
            }
        }
    } catch (err) {
        return {
            status: 500
        }
    }
}

