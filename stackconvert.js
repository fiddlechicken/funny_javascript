const prompt = require("prompt-sync")();



let complete = false;
let cont = 0;
let raw = 0;
let result = {
    stacks: 0,
    remainder: 0,
};
const toStacks = (num) => {
    const resultObj = (s=0, r=0) => {
        const stacks = s;
        const remainder = r;
        return {
            stacks,
            remainder,
        }
    }
    let result = resultObj();
    result.remainder = num % 64;
    result.stacks = Math.floor(num/64);
    return result;
}
const toRaw = (stacks, remainder=0) => (stacks * 64) + remainder;
const promptType = () => parseInt(prompt(`convert to \n[ 1 ] stacks\n[ 2 ] blocks\n`))
let convertType = promptType();
while (!complete) {
    if (convertType === 1) {
        raw = prompt('enter number to convert: ')
        result = toStacks(parseInt(raw))
        console.log(`${result.stacks} stacks and ${result.remainder}`);
    }
    else if (convertType === 2) {
        result.stacks = parseInt(prompt('enter stacks to convert: '));
        result.remainder = parseInt(prompt('remainder? (type 0 for none) '));
        raw = toRaw(result.stacks, result.remainder);
        console.log(`${raw} blocks`)
    }
    cont = prompt('continue? [y/N] ');
    if (cont.toLowerCase == 'n') {
        complete = true;
    }
    else if (cont.toLowerCase == 'y') {
        convertType = promptType();
    }
}