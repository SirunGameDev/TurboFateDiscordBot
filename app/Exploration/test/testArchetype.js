import assert from 'node:assert/strict';
import { describe, it, test } from 'node:test';
import * as Archetypes from '../Archetype.js';

describe("Archetypes", (t) => {
    it("getReth", () => {
        assert.doesNotThrow(() => {
            let Reth = Archetypes.getReth();
        });
    });
    it("getVoltaire", () => {
        assert.doesNotThrow(() => {
            let Voltaire = Archetypes.getVoltaire();
        });
    });
    it("getBethesda", () => {
        assert.doesNotThrow(() => {
            let Bethesda = Archetypes.getBethesda();
        });
    });
    it("getAbigail", () => {
        assert.doesNotThrow(() => {
            let Abigail = Archetypes.getAbigail();
        });
    });
});