function isFiveLetterWord(word: string): boolean {
  return word.length === 5 ? true : false;
}

function getFiveLetterWords(words: string[]): string[] {
  const fiveLetters = words.filter((el) => isFiveLetterWord(el));
  return fiveLetters;
}

function toUpperCase(words: string[]): string[] {
  const toUpper = words.map((el) => el.toUpperCase());
  return toUpper;
}

function getRandomWord(randomWords: string[]): string {
  const randomNum = Math.floor(Math.random() * randomWords.length);
  return randomWords[randomNum];
}

export { isFiveLetterWord, getFiveLetterWords, toUpperCase, getRandomWord };
