const slowSum = (a: number, b: number) => {
    return new Promise<number>((resolve, reject) => {
        setTimeout(() => {
            resolve(a+b);
        },1000)
    });
}

const slowMult = (a: number, b: number) => {
    return new Promise<number>((resolve, reject) => {
        setTimeout(() => {
            resolve(a*b);
        },1500)
    });
}


const slowDiv = (a: number, b: number) => {
    return new Promise<number>((resolve, reject) => {
        setTimeout(() => {
            if(b === 0 || a === 0){
                reject(new Error("You cannot divide by zero!"))
            }
            resolve(a/b);
        },2000)
    });
}

async function asyncAwait() {
    
    try {
    const sum: number = await slowSum(1,5);
    console.log(sum);

    const sumMultiply : number = await slowDiv(sum,2);
    console.log(sumMultiply);
    
    const divide: number = await slowDiv(6,3);
    console.log(divide);

    const divideByZero : number = await slowDiv(6,0);
        
    } catch (error) {
        console.log(`${error}`);
    }
    
}

asyncAwait();