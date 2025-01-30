const printStuff = (amount: number, text: string):void => {
    console.log(`Hello ${text}, you are number ${amount}`);
}
const twoDArray = (element1: string, element2: string): string[] => {
    return [element1, element2];
}
const numberToString = (number: number): string => {
    return `${number}`;
}

let printArrow = (amount: number, text: string) => console.log(`Hello ${text}, you are number ${amount}`);
let twoArrow = (element1: string, element2: string): string[] => [element1,element2];
let numberToStringArrow = (number: number) => `${number}`;