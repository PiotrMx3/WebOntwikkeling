import { get } from "http";

// const getRandomNumber = (): Promise<number> => {
// return new Promise<number>((resolve, reject) => {
//     setTimeout(() => {
//         resolve(Math.floor(Math.random() * 100));
//     }, 3000);
// })

// }


// async function fetchRandomNumber() {
// let resolve = await getRandomNumber();
// console.log(resolve)
// }


// fetchRandomNumber();

// const delay = (delay: number): Promise<void> => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve();
//         }, delay);
//     });
// }

// (async() => {
//     await Promise.all([delay(1000), delay(10000), delay(15000)])
//     console.log("Done!");
// })();



// interface Callback {
//     (n: number): void
// }

// const getRandom = (callback: Callback) => {
//     setTimeout(() => {
//         callback(Math.floor(Math.random() * 100))
//     },1000);
// }

// getRandom((n) => {
//     console.log(`The number was ${n}`);
// });



const promiseFun = () => {
    return new Promise<string>((resolve, reject) => {

    setTimeout(() => {
        const n : number = Math.floor(Math.random() * 100);
        resolve(`The number was ${n}`);
    }, 1000);
    });
}

let promiseResult: string = "";

promiseFun().then(r => promiseResult = r);

console.log(promiseResult)






const promiseAsync = async () => {
    let data = await promiseFun();

    console.log(data);
}

promiseAsync();




    






