import { createRouteClient } from '@frameless/client';
/*
 * import rest modules
 */
import * as framelessExamplesHelloRest from '@frameless-examples/hello-rest';

/*
 * TODO: Add base plugins for initialization
 */

/*
 * add rest modules to the service
 */
export const createClient = (baseUrl: string) => {
    return {
        framelessExamplesHelloRest: createRouteClient(
            baseUrl,
            framelessExamplesHelloRest
        ),
    };

};
