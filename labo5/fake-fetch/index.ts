import { get } from "http";

const getRandomNumber = (): Promise<number> => {
return new Promise<number>((resolve, reject) => {
    setTimeout(() => {
        resolve(Math.floor(Math.random() * 100));
    }, 3000);
})

}


async function fetchRandomNumber() {
let resolve = await getRandomNumber();
console.log(resolve)
}


fetchRandomNumber();

const delay = (delay: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, delay);
    });
}

(async() => {
    await Promise.all([delay(1000), delay(10000), delay(15000)])
    console.log("Done!");
})();