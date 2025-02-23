import { error } from "console";
import { resourceLimits } from "worker_threads";

// const slowSum = (a: number, b: number) => {
//     return new Promise<number>((resolve, reject) => {
//         setTimeout(() => {
//             resolve(a+b);
//         },1000)
//     });
// }

// const slowMult = (a: number, b: number) => {
//     return new Promise<number>((resolve, reject) => {
//         setTimeout(() => {
//             resolve(a*b);
//         },1500)
//     });
// }


// const slowDiv = (a: number, b: number) => {
//     return new Promise<number>((resolve, reject) => {
//         setTimeout(() => {
//             if(b === 0 || a === 0){
//                 reject(new Error("You cannot divide by zero!"))
//             }
//             resolve(a/b);
//         },2000)
//     });
// }

// slowSum(1,5).then(m => console.log(m));
// slowSum(1,5).then(result => slowMult(result,2)).then(result => console.log(result));

// slowDiv(6,3).then(result => console.log(result));
// slowDiv(6,0).then(result => console.log(result)).catch(error => console.log(error.message));


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
            if(b === 0) reject("Delen door 0 is niet toegelaten");
            resolve (a / b);
        }, 2000);
    });
};



slowSum(1,5).then(r => console.log(r));
slowSum(1,5).then(r => slowMult(r,2).then(m => console.log(m)));
slowDiv(6,3).then(r => console.log(r)).catch(err => console.log(err));
slowDiv(6,0).then(r => console.log(r)).catch(err => console.log(err));




