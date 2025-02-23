import { Console } from "console";
import data from "./movies.json";

interface Movie {
    title: string;
    year: number;
    actors: string[];
    metascore: number;
    seen: boolean;
}


function printMovie(movie: Movie): void {
    
    for (const [key,value] of Object.entries(movie)) {
        // if(key === "actors") {
        //     console.log(`${key}: `)
        //     movie[key].forEach((e) => {
        //         console.log(`${e}`)
        //     })
        // }
        // else {
            if(key === "seen" && value === true){
                console.log(`${key}: YES`)
            }
            else if((key === "seen" && value === false)) {
                console.log(`${key}: NO`)
            }
            else if(key === "actors"){
                console.log(`${key}: ${movie[key].join(", ")}`)
            }
            else {

                console.log(`${key}: ${value}`)
            }
        // }
    }
}



printMovie(data[0]);
printMovie(data[1]);
printMovie(data[2]);


function wasMovieMadeInThe90s(movie:Movie):boolean {
    
    return movie.year >= 1990 && movie.year <= 1999
}

if(wasMovieMadeInThe90s(data[0])){
console.log(`${data[0].title} komt uit jaren 90s`)
} else {
    console.log(`${data[0].title} komt niet uit jaren 90s`) 
}



    function averageMetaScore(movie:Movie[]):number {

   const average : number = (movie.reduce((a,b) => a + b.metascore, 0)) / movie.length;

   return average;
    
}

console.log(`Gemiddelde metascore is: ${averageMetaScore(data)}`);



function FakeMetaScore(movie: Movie, newMeta:number): Movie {
   
    movie.metascore = newMeta;

    return movie;    
}

console.log(data[0].metascore);
console.log(FakeMetaScore(data[0],22));

