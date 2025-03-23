import express, {Express} from "express";
import dotenv from "dotenv";
import path from "path";
import {emit} from "process";
import {
  isFiveLetterWord,
  getFiveLetterWords,
  toUpperCase,
  getRandomWord,
} from "./words";
import {cp} from "fs";

dotenv.config();

const app: Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT || 3000);

let WORDS = [
  "water",
  "bread",
  "frenzy",
  "tower",
  "creepy",
  "donkey",
  "fruit",
  "bloom",
  "music",
  "pause",
  "sport",
  "market",
  "floor",
  "walking",
  "prize",
  "chant",
  "swoop",
  "quill",
  "plume",
  "crisp",
  "sweep",
  "grace",
];

let randomWord = "water";

app.get("/words", (req, res) => {
  const q = typeof req.query.q === "string" ? req.query.q : "";
  const direction =
    typeof req.query.sortDirection === "string" ? req.query.sortDirection : "";

  let formatted = toUpperCase(WORDS);

  if (q === "") {
    direction === "desc"
      ? formatted.sort((a, b) => b.localeCompare(a))
      : formatted.sort((a, b) => a.localeCompare(b));
    formatted = formatted.slice(0, 40);
  } else {
    const includWord = toUpperCase(
      WORDS.filter((el) => el.toLowerCase().includes(q.toLowerCase()))
    );

    direction === "desc"
      ? includWord.sort((a, b) => b.localeCompare(a))
      : includWord.sort((a, b) => a.localeCompare(b));

    return res.render("words", {
      list: includWord,
      q: q,
      dir: direction,
    });
  }

  res.render("words", {
    list: formatted,
    q: q,
    dir: direction,
  });
});

app.get("/guess", (req, res) => {
  res.render("guess", {
    word: undefined,
    colors: undefined,
    lengthCheck: true,
    guessed: false,
  });

  console.log(randomWord);
});

app.post("/guess", (req, res) => {
  const userWord = req.body.guess.toUpperCase();
  const aftercheck = checkWord(userWord, randomWord);
  // const lengthCheck = userWord.length !== 5;
  const lengthCheck = WORDS.includes(userWord.toLowerCase());

  const guessed = aftercheck.every((color) => color.toLowerCase() === "green");

  // aftercheck.forEach((el) => {
  //   if (el.toLowerCase() !== "green") guessed = false;
  // });

  res.render("guess", {
    word: userWord,
    colors: aftercheck,
    lengthCheck: lengthCheck,
    guessed: guessed,
  });
});

app.get("/restart", (req, res) => {
  randomWord = createNewWord();
  res.redirect("/");
});

app.get("/", (req, res) => {
  res.render("index");
});

function createNewWord() {
  const wordsArray = getFiveLetterWords(WORDS);
  const random = getRandomWord(wordsArray);
  return random;
}

function checkWord(guess: string, target: string): string[] {
  guess = guess.toUpperCase();
  target = target.toUpperCase();
  let result = ["X", "X", "X", "X", "X"]; // Initially set all to 'X' for gray
  let targetCopy = target.split("");

  // First pass for correct positions (Green)
  for (let i = 0; i < 5; i++) {
    if (guess[i] === target[i]) {
      result[i] = "G"; // Green for correct position
      targetCopy[i] = "_"; // Mark as used
    }
  }

  // Second pass for correct letters in the wrong position (Yellow)
  for (let i = 0; i < 5; i++) {
    if (result[i] !== "G" && targetCopy.includes(guess[i])) {
      result[i] = "Y"; // Yellow for correct letter in wrong position
      targetCopy[targetCopy.indexOf(guess[i])] = "_"; // Mark as used
    }
  }

  return result.map((value) =>
    value === "X" ? "gray" : value === "G" ? "green" : "yellow"
  );
}

app.listen(app.get("port"), async () => {
  randomWord = createNewWord();
  const data = await fetch(
    "https://raw.githubusercontent.com/similonap/word-guess-api/main/words.json"
  );
  WORDS = await data.json();
  console.log("Server started on http://localhost:" + app.get("port"));
});
