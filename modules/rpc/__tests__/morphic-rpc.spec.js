'use strict';

const { createHandler } = require('..');

describe('morphic-rpc', () => {
    it('needs tests', async () => {
        const thing = await createHandler(require('fs'));
        console.log({
            thing
        });
        expect(1).toBe(1);
    });
});
