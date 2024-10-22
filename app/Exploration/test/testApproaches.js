import assert from 'node:assert/strict';
import { describe, it, test } from 'node:test';
import { Approaches } from '../Approaches.js';

describe("Approaches", (t) => {
    it("construction", () => {
        
        assert.doesNotThrow(() => {
            let Obj = new Approaches();
        });
    });

    it("getArray", () => {
        let Obj = new Approaches();

        assert.deepStrictEqual(Obj.getArray(), [
            {careful : 0},
            
            {clever : 0},

            {flashy : 0},

            {forceful : 0},

            {quick : 0},

            {sneaky : 0},
        ])
    });
}
)