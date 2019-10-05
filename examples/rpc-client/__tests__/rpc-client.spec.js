'use strict';

import { morphicExamplesHelloRpc } from '..';

describe('rpc-client', () => {
    it('works', async () => {
        expect(
            await morphicExamplesHelloRpc('world')
        ).toBe('hello world');
    });
});
