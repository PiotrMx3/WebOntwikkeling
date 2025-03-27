import express from "express";
import { createPost, getProfileByUsername, getPosts, getPostsByUsername } from "./data";
import {Profile, Post, Trends} from "./types";

const app = express();

let trends: Trends[] = []


app.set("view engine","ejs");

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended:true}));
app.use(express.static("public"));

app.get("/", (req,res) => {
    const posts = getPosts();
    return res.render("index", {
       posts: posts,
       error: false,
       trends: trends.slice(0,3),
    });

});


app.post("/", (req,res) => {

    const newPost = {...req.body,createdOn: new Date().toISOString()};

    if(newPost.text === "") {
        const posts = getPosts();
        return res.render("index", {
           posts: posts,
           error: true,
           trends: trends.slice(0,3),
        });
    }

    createPost(newPost);
    res.redirect("/");
    
});


app.get("/:user", (req,res) => {
    const user = typeof req.params.user ? req.params.user : "";
    const profile = getProfileByUsername(user);
    const posts = getPostsByUsername(user);

    if( profile === undefined) {
        return res.sendStatus(404);
    }

    res.render("profile", {
        profile: profile,
        posts: posts,
        trends: trends.slice(0,3),
    });
});

app.listen(3000, async () => {
    const data = await fetch("https://raw.githubusercontent.com/similonap/json/refs/heads/master/twitter/trending.json");
    trends = await data.json();
    console.log(`The application is listening on http://localhost:3000`);
})