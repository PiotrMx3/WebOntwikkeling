const array : number[] = [1,2,3,4,5];

let arraySum = (array : number[]): number => {
return array.reduce((a,b) => a + b , 0);
}


let result : number = arraySum(array);

console.log(result);

export{};