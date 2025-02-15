import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app : Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT ?? 3000);




interface Person {
    name: string;
    age: number;
}

interface Field {
    value: string,
    text: string,
    selected: string
}

const persons: Person[] = [
    { name: "Sven", age: 25 },
    { name: "Andie", age: 24 },
    { name: "George", age: 30 },
    { name: "Zeoff", age: 28 },
    { name: "Mia", age: 22 },
    { name: "Liam", age: 27 },
    { name: "Emma", age: 26 },
    { name: "Noah", age: 29 }
];





app.get("/sort", (req,res) => {
    
    const sortField : string = typeof req.query.sortField === "string" ? req.query.sortField : "";
    const sortDirection : string = typeof req.query.sortDirection === "string" ? req.query.sortDirection : "";
    
    const sortTypeFields : Field[] = [
        { value: "name", text: "Name", selected: sortField === "name" ? "selected" : "" },
        { value: "age", text: "Age", selected: sortField === "age" ? "selected" : ""},
        { value: "random", text: "Random", selected: sortField === "random" ? "selected" : ""}
    ];

    const directionTypeFields : Field[] = [
        {value: "asc", text: "Ascending", selected: sortDirection === "asc" ? "selected" : ""},
        {value: "desc", text: "Descending", selected: sortDirection === "desc" ? "selected" : ""}
    ];


    const formatted : Person[] = [...persons].sort((a,b) => {
        
        
        if(sortField === "name") {
            return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        }
        else if (sortField === "age") {
            return sortDirection === "asc" ? a.age - b.age : b.age - a.age;
        }
        else {
            return 0;
        }

    });
    
    res.render("sort", {
        persons: formatted,
        sort: sortTypeFields,
        direction: directionTypeFields
    });
});

app.get("/", (req, res) => {

    if(typeof req.query.q === "string") {

        let q : string = req.query.q ?? "";
        let filteredPersons = persons.filter((person) =>
            person.name.toLowerCase().startsWith(q.toLowerCase())
        );

        res.render("form", { persons: filteredPersons, q: q });
    }
    else {
        res.render("form", { persons: persons, q: "" });

    }
});




app.listen(app.get("port"), () => {
    console.log("Server started on http://localhost:" + app.get("port"));
});