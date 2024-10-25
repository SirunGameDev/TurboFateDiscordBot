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

    it("usages", () => {
        let aspObj = new Aspect("Test A", "Test B", "Test C", 2);

        aspObj.addUses();
        aspObj.addUses(3);

        assert.strictEqual(7, aspObj.getFreeUsage());

        aspObj.useUsages();
        aspObj.useUsages(3);

        assert.strictEqual(3, aspObj.getFreeUsage());

    });
});