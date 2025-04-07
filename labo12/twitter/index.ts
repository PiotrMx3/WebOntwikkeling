import express from "express";
import {
  createTweet,
  getProfileByHandle,
  getTweets,
  getTweetsByHandle,
} from "./data";
import {Profile, Tweet} from "./types";

const app = express();

app.set("view engine", "ejs");

app.use(express.json({limit: "1mb"}));
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  let tweets = await getTweets();

  res.render("index", {
    tweets: tweets,
  });
});

app.post("/", (req, res) => {
  const newTweet: Tweet = {...req.body, createdOn: new Date().toISOString()};
  createTweet(newTweet);
  res.redirect("/");
});

app.get("/:profile", async (req, res) => {
  const profileParam =
    typeof req.params.profile === "string" ? req.params.profile : "";

  const profileToFind = await getProfileByHandle(profileParam);
  const profileTweets = await getTweetsByHandle(profileParam);

  res.render("profile", {
    profile: profileToFind,
    profileTweets: profileTweets,
  });
});

app.listen(3000, async () => {
  console.log(`The application is listening on http://localhost:3000`);
});
