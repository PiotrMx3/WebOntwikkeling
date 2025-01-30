
const numbers : number[] = [-4,-4,1,2,3,4,5];


function filterPositive(array:number[]): number[] {
    let formattedArray: number[] = [];

    for (let i = 0; i < array.length; i++) {
        if(array[i] >= 0) formattedArray.push(array[i]);
    }
    return formattedArray;
};


function filterNegative(array:number[]): number[] {
    let formattedArray: number[] = [];
    
    for (let i = 0; i < array.length; i++) {
        if(array[i] < 0) formattedArray.push(array[i]);
    }
    return formattedArray;
};


function filterEven(array:number[]): number[] {
    let formattedArray: number[] = [];
    
    for (let i = 0; i < array.length; i++) {
        if(array[i] % 2 === 0) formattedArray.push(array[i]);
    }
    return formattedArray;
};



const isPositive = (number:number) => number >= 0;

function filter(array:number[], callback:(number:number) => boolean): number[] {
    let formattedArray: number[] = [];
    
    for (let i = 0; i < array.length; i++) {
        
        if(callback(array[i])) formattedArray.push(array[i]);
    }
    return formattedArray;
}

console.log(filter(numbers,isPositive).join(" "));


// console.log(`${filterPositive(numbers).join(" ")}`);
// console.log(`${filterNegative(numbers).join(" ")}`);
// console.log(`${filterEven(numbers).join(" ")}`);


