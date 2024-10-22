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
        let aspObj = new Aspect("testa", "testb", "testc");

        assert.strictEqual("testc", aspObj.getContext());
        assert.strictEqual("testa", aspObj.getDescription());
        assert.strictEqual("testb", aspObj.getLifetime());

    });
});