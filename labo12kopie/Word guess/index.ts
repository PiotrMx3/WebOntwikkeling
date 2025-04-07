import express, {Express} from "express";
import dotenv from "dotenv";
import path from "path";
import {getFiveLetterWords, toUpperCaseWords, getRandomWord} from "./words";
import {register} from "module";

dotenv.config();

const app: Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT || 3000);

const WORDS = [
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
  const arrayUpperLetters = toUpperCaseWords(WORDS);
  console.log(arrayUpperLetters);

  res.render("words", {
    items: arrayUpperLetters,
  });
});

app.get("/guess", (req, res) => {
  console.log(randomWord);
  res.render("guess", {
    input: "",
    color: "",
    error: "",
    win: "",
  });
});

app.post("/guess", (req, res) => {
  const userInput = typeof req.body.guess === "string" ? req.body.guess : "";
  const guessed = checkWord(userInput, randomWord);
  const win = guessed.every((el) => el.toLowerCase() === "green");
  const length = userInput.length > 5 ? true : false;

  res.render("guess", {
    input: userInput,
    color: guessed,
    error: length,
    win: win,
  });
});

app.get("/restart", (req, res) => {
  createNewWord();
  res.redirect("/guess");
});

app.get("/", (req, res) => {
  res.render("index", {});
});

function createNewWord() {
  const arrayFiveWords = getFiveLetterWords(WORDS);
  randomWord = getRandomWord(arrayFiveWords);
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

app.listen(app.get("port"), () => {
  createNewWord();
  console.log("Server started on http://localhost:" + app.get("port"));
});
