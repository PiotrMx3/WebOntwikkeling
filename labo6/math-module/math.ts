interface MathFunction {
    (a : number , b : number) : number
}


export let add : MathFunction = (a,b) => {
    return a + b;
}

export let subtract : MathFunction = (a,b) => {
    return a - b;
}


export let multiply : MathFunction = (a,b) => {
    return a * b;
}


export let divide : MathFunction = (a,b) => {
    if (b === 0) {
        throw new Error("Cannot divide by zero");
    }
    return a / b;
}
