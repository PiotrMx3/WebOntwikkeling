function isFiveLetterWord(word: string): boolean {
  return word.length === 5 ? true : false;
}

function getFiveLetterWords(wordArray: string[]): string[] {
  const fiveLettersWords = wordArray.filter((word) => isFiveLetterWord(word));
  return fiveLettersWords;
}

function toUpperCaseWords(wordsArray: string[]): string[] {
  const upperWords = wordsArray.map((el) => el.toUpperCase());
  return upperWords;
}

function getRandomWord(array: string[]): string {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

export {getFiveLetterWords, toUpperCaseWords, getRandomWord};
