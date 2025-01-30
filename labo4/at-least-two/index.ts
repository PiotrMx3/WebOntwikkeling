interface TestFunction {
    (n:number): boolean
}



let isEven:TestFunction = (n:number) => n % 2 === 0;
let isOdd: TestFunction = (n:number) => n % 2 !== 0;


let atLeastTwo = (array:number[],callback:TestFunction): boolean => {

    
    let result: number = 0;
    for (const e of array) {
     if(callback(e)) result ++;
     if(result >= 2) return true;   

    }

    return false;

}



console.log(atLeastTwo([2,3,4,6,8], isOdd));
console.log(atLeastTwo([2,3,4,5,6,8], isOdd));
console.log("")
console.log("")
console.log("")
console.log(atLeastTwo([2,3,4,6,8], isEven));
console.log(atLeastTwo([2,3,4,5,6,8], isEven));