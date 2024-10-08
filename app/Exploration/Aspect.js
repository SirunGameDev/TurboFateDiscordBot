export class Aspect {
    #description;

    #lifetime;

    #context;

    constructor (desc, lifetime, context) {
        this.#description = desc;
        this.#lifetime = lifetime;
        this.#context = context;
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
}