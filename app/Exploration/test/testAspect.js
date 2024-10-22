import assert from 'node:assert/strict';
import { describe, it, test } from 'node:test';
import { Aspect } from '../Aspect.js';

describe("Aspect throw no error", (t) =>{
    it("constructor", () => {
        assert.doesNotThrow(() => {
            let aspObj = new Aspect();
        });
    });
    it("test getter", () => {
        let aspObj = new Aspect("test", "test", "test");

        assert.strictEqual("test", aspObj.getContext());
        assert.strictEqual("test", aspObj.getDescription());
        assert.strictEqual("test", aspObj.getLifetime());

    });
});