---
to: <%=locals.in%>/<%=name%>/lib/<%=name%>.ts
---
import * as direct from '@frameless-examples/hello-rpc';
import * as client from '@frameless-examples/rpc-client';

export const url = '/<%= h.changeCase.kebab(name) %>/:name';

export const method = 'GET';

type Input = {
    params: {
        name: string
    },
    options: {}
}

export const handler = async (input: Input) => {
    return {
        status: 200,
        headers: {
            ['powered-by']: 'morphic'
        },
        body: {
            greetings: {
              direct: await direct.helloRpc(input.params.name),
              client: await client.helloRpc(input.params.name)
            }
        }
    }
}

export const schema = {
    response: {
        200: {
            type: 'object',
            properties: {
                greeting: {
                    type: 'string'
                }
            }
        }
    }
}