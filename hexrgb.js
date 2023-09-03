// assumes all rgb is formatted as "(0,0,0)"
// assumes all hex is formatted as "#000000"
// returns opposite string in the same format.

const hexDecimalConvert = (digit, type) => {
    const toHex = (digit) => {
        let string = digit + '';
        let decimalPlaces = [];
        let remainder = 0;
        let hex = [];
        for (num in string) {
            decimalPlaces.push(parseInt(string.at(num)));
        }
        let d = decimalPlaces.length - 1;
        for (let i = 0; i < decimalPlaces.length; i++) {
            decimalPlaces[i] *= 10**d;
            let a = decimalPlaces[i];
            let b = a % 16;
            decimalPlaces[i] = a - b;
            remainder += b;
            d--;
        }
        for (num of decimalPlaces) {
            decimalPlaces[decimalPlaces.indexOf(num)] /= 16;
        }
        hex[0] = decimalPlaces.reduce((acc, num) => acc += num, 0);
        hex[0] += Math.floor(remainder / 16)
        hex[1] = remainder % 16;
        for (num of hex) {
            if (num === 10) {
                hex[hex.indexOf(num)] = 'A';
            }
            else if (num === 11) {
                hex[hex.indexOf(num)] = 'B';
            }
            else if (num === 12 ) {
                hex[hex.indexOf(num)] = 'C';
            }
            else if (num === 13) {
                hex[hex.indexOf(num)] = 'D';
            }
            else if (num === 14) {
                hex[hex.indexOf(num)] = 'E';
            }
            else if (num === 15) {
                hex[hex.indexOf(num)] = 'F';
            }
        }
        hex = hex.reduce((acc, dig) => acc += dig, '');
        return hex;
    }
    const toDecimal = (digit) => {
        let digitArray = [];
        for (char of digit) {
            digitArray.push(char)
        }
        for (digit of digitArray) {
            if (digit == 'A') {
                digitArray[digitArray.indexOf(digit)] = '10'
            }
            else if (digit == 'B') {
                digitArray[digitArray.indexOf(digit)] = '11'
            }
            else if (digit == 'C') {
                digitArray[digitArray.indexOf(digit)] = '12'
            }
            else if (digit == 'D') {
                digitArray[digitArray.indexOf(digit)] = '13'
            }
            else if (digit == 'E') {
                digitArray[digitArray.indexOf(digit)] = '14'
            }
            else if (digit == 'F') {
                digitArray[digitArray.indexOf(digit)] = '15'
            }
        }
        for (digit of digitArray) {
            digitArray[digitArray.indexOf(digit)] = parseInt(digit)
        }
        let d = digitArray.length - 1;
        for (let i = 0; i < digitArray.length; i++) {
            digitArray[i] *= 16**d;
            d--;
        }
        let result = digitArray.reduce((acc, num) => acc += num, 0);
        return result;
    }
    if (type === 0) {
        return toHex(digit);
    }
    else if (type === 1) {
        return toDecimal(digit);
    }
}
const hexrgb = (string) => { /////////////////////////////////////////////////////////////////
    let isHex = false;
    for (char of string) {
        if (char == '#') {
            isHex = true;
        }
    }
    const stringToInt = (string) => {
        if (parseInt(string)) {
            return parseInt(string)
        }
        else if (string == '0') {
            return 0;
        }
        else {
            return null;
        }
    }
    const rgbToHex = (string) => {
        let type = 0;
        let rgb = [];
        let rgbStr = [];
        let rgbInt = [];
        let i = 0;
        const hexCompile = (hex) => '#' + hex.reduce((acc, hex) => acc += hex, '');
        for (char of string) {
            if (parseInt(char) || parseInt(char) == 0) {
                rgb[i] += char;
            }
            if (char == ',') {
                i++;
            }
        }
        for (let i = 0; i < rgb.length; i++) {
            rgbStr[i] = [];
            for (let ii = 0; ii < rgb[i].length; ii++) {
                if (parseInt(rgb[i][ii]) || rgb[i][ii] == '0') {
                    rgbStr[i] += stringToInt(rgb[i][ii]);
                }
            }
        }
        i = 0;
        for (str of rgbStr) {
            rgbInt[i] = stringToInt(str);
            i++;
        }
        i = 0;
        for (num of rgb) {
            for (char of num) {
                if (!parseInt(char)) {
                    num.replace(char, '');
                }
                i++;
            }
            i = 0;
        }
        let hexPre = [];
        for (let i = 0; i < rgbInt.length; i++) {
            hexPre[i] = hexDecimalConvert(rgbInt[i], type)
        }
        let hex = hexCompile(hexPre);
        return hex;
    }
    const hexToRGB = (string) => {
        let type = 1;
        string = string.replace('#', '')
        let result = [];
        const rgbCompile = (rgb) => {
            let final = [];
            for (let i = 0; i < rgb.length; i++) {
                final.push(rgb[i]);
                final.push(',');
            }
            final.pop();
            final = final.reduce((acc, value) => acc += value, '');
            final = `(${final})`
            return final;
        }
        for (let i = 0; i < string.length / 2; i++) {
            result.push(string.slice((i * 2),(i * 2) + 2));
        }
        for (let i = 0; i < result.length; i++) {
            result[i] = hexDecimalConvert(result[i], type);
        }
        result = rgbCompile(result)
        return result;
    }
    if (isHex) {
        return hexToRGB(string);
    }
    else {
        return rgbToHex(string)
    }
}
console.log(hexrgb("(255,0,78)"))