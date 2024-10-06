export function getRoll(min, max) {
    return min + Math.floor(Math.random() * max);
}

export function getD6 () {
    return getRoll(1,6);
}

export function getTurboFateDice () {
    return getRoll(1,3)-2;
}

export function getTurboFateRoll () {
    var result = getTurboFateDice()+getTurboFateDice()+getTurboFateDice()+getTurboFateDice();
    return result;
}