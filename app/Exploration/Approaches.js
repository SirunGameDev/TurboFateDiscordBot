
export class Approaches {
    careful = 0;
    clever = 0;
    flashy = 0;
    forceful = 0;
    quick = 0;
    sneaky = 0;


    constructor (careful = 0, clever = 0, flashy = 0, forceful = 0, quick = 0, sneaky = 0) {
        this.careful = careful;
        this.clever = clever;
        this.flashy = flashy;
        this.forceful = forceful;
        this.quick = quick;
        this.sneaky = sneaky;
    }
    getArray() {
    return [
        {careful : this.careful},
        
        {clever : this.clever},

        {flashy : this.flashy},

        {forceful : this.forceful},

        {quick : this.quick},

        {sneaky : this.sneaky},

    ];}
}
