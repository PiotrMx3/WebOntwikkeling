import express from "express";
import { realpathSync } from "fs";
import { register } from "module";


const app = express();

app.set("port",3000);

app.get("/", (req, res) => {
    res.type("text/html");
    res.send(`
      <h1>Yet another hello world app...</h1>
      <p><a href="/helloworld">Go to Hello World</a></p>
      <p><a href="/goodbye">Go to Goodbye</a></p>
    `);
  });
  
  app.get("/helloworld", (req, res) => {
    res.type("text/html");
    res.send(`
      <h1>Hello World</h1>
      <p><a href="/">Back to Home</a></p>
      <p><a href="/goodbye">Go to Goodbye</a></p>
    `);
  });
  
  app.get("/goodbye", (req, res) => {
    res.type("text/html");
    res.send(`
      <h1>Later <strong>World</strong></h1>
      <h1>Later <strong>World</strong></h1>
      <h1>Later <strong>World</strong></h1>
      <p><a href="/">Back to Home</a></p>
      <p><a href="/helloworld">Go to Hello World</a></p>
    `);
  });


  interface Person {
    name:string;
    age:number;
  }

  let data : Person[] = [];
  


  app.get("/getData", (req,res) => {
    res.setHeader("Content-Type", "application/json");
    res.json(data);
  });


  app.get("/users",(req,res) => {
    res.setHeader("Content-Type", "application/json");
    res.json(data);

  });
  


  app.use((req, res) => {
    res.type("text/html");
    res.status(404);
    res.send("404 - Not Found");
  });
  



app.listen(app.get("port"), async () => {
    let response = await fetch("https://jsonplaceholder.typicode.com/users");
    data = await response.json();
    console.log("[server] http://localhost:" + app.get("port"));
});