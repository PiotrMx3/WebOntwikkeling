import express from "express";
import { realpathSync } from "fs";
import { get } from "http";
import { register } from "module";
import { PipelineSource } from "stream";

const app = express();
app.set("port",3000);

interface Person {
  name: string;
  age: number;
  profilePic: string;
}

const thisIsme : Person = {
  name: "Piotr",
  age: 29,
  profilePic: "/assets/ikke.png"
};

app.use(express.static("public"));



app.get("/", (req,res) => {
res.type("text/html");
res.send(`
  <h1>Mijn Eerste App in Express !</h1>`)
});

app.get("/whoami", (req,res) => {
  res.type("text/html");
  res.send(`
    <h1>Mijn Eerste App in Express !</h1>
    <p>"My name is ${thisIsme.name} I am ${thisIsme.age} years old"</p>
    <img src="${thisIsme.profilePic}" alt="piotr mulinski">`);
  });

  app.get("/whoamijson", (req,res) => {
    res.type("application/json");
    res.json(thisIsme);

    });

  interface RootObject {
    id : number;
    name : string;
    sprites : Pics;
  }

  interface Pics {
    back_default: string;
    front_default: string;

  }

let pikachu : RootObject;

  app.get("/pikachujson" , (req,res) => {
    res.type("application/json");
    res.json({
      id: pikachu.id,
      name: pikachu.name,
      frontImage: pikachu.sprites.front_default,
      backImage: pikachu.sprites.back_default

  });
  });

  app.get("/pikachuhtml" , (req,res) => {
    res.type("text/html");
    res.send(`
      <h1>Hello World ! !</h1>
      <p>"My name is ${pikachu.name} My id is ${pikachu.id} "</p>
      <img src="${pikachu.sprites.front_default}" alt="pikachufront">
      <img src="${pikachu.sprites.back_default}" alt="pikachuback">`);
    });

    const colors: string[] = [
      "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
      "#33FFF5", "#F5FF33", "#FF8C33", "#8C33FF", "#33FF8C",
      "#FF3333", "#33A1FF", "#A1FF33", "#FF338C", "#8CFF33",
      "#5733FF", "#33FFB5", "#B533FF", "#FFB533", "#33B5FF"
    ];


    app.get("/randomcolor" , (req,res) => {
      const index = Math.floor(Math.random() * colors.length);
      console.log(index);
      res.type("text/html");
      res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                <style>
                    body{
                        background-color: ${colors[index]};
                        display: flex; justify-content: center; align-items: center; height: 100vh;
                    };
                </style>
            </head>
            <body>
                <h1>${colors[index]}</h1>
            </body>
            </html>`);
      });
  



app.use((req,res) => {
  res.type("text/html");
  res.status(404);
  res.send("Error - 404 Not Found");
});




app.listen(app.get("port"), async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
  pikachu = await response.json();

  console.log("[SERVER] http://localhost:" + app.get("port"));
});










// const app = express();

// app.set("port",3000);

// app.get("/", (req, res) => {
//     res.type("text/html");
//     res.send(`
//       <h1>Yet another hello world app...</h1>
//       <p><a href="/helloworld">Go to Hello World</a></p>
//       <p><a href="/goodbye">Go to Goodbye</a></p>
//     `);
//   });
  
//   app.get("/helloworld", (req, res) => {
//     res.type("text/html");
//     res.send(`
//       <h1>Hello World</h1>
//       <p><a href="/">Back to Home</a></p>
//       <p><a href="/goodbye">Go to Goodbye</a></p>
//     `);
//   });
  
//   app.get("/goodbye", (req, res) => {
//     res.type("text/html");
//     res.send(`
//       <h1>Later <strong>World</strong></h1>
//       <h1>Later <strong>World</strong></h1>
//       <h1>Later <strong>World</strong></h1>
//       <p><a href="/">Back to Home</a></p>
//       <p><a href="/helloworld">Go to Hello World</a></p>
//     `);
//   });


//   interface Person {
//     name:string;
//     age:number;
//   }

//   let data : Person[] = [];
  


//   app.get("/getData", (req,res) => {
//     res.setHeader("Content-Type", "application/json");
//     res.json(data);
//   });


//   app.get("/users",(req,res) => {
//     res.setHeader("Content-Type", "application/json");
//     res.json(data);

//   });
  


//   app.use((req, res) => {
//     res.type("text/html");
//     res.status(404);
//     res.send("404 - Not Found");
//   });
  



// app.listen(app.get("port"), async () => {
//     let response = await fetch("https://jsonplaceholder.typicode.com/users");
//     data = await response.json();
//     console.log("[server] http://localhost:" + app.get("port"));
// });