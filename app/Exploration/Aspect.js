export class Aspect {
    #description;

    #lifetime;

    #context;

    #freeUsage;

    constructor (desc, lifetime, context, freeUsage = 0) {
        this.#description = desc;
        this.#lifetime = lifetime;
        this.#context = context;
        this.#freeUsage = freeUsage;
    }
    getDescription() {
        return this.#description;
    }
    getLifetime() {
        return this.#lifetime;
    }
    getContext() {
        return this.#context;
    }

    getFreeUsage(){
        return this.#freeUsage;
    }

    addUses(add = 2) {
        this.#freeUsage += add;
    }

    useUsages(sub = 1) {
        this.#freeUsage -= sub;
    }

}