var wordlist = require("wordle-wordlist");
var topwords = require("fs").readFileSync("topwords.txt", "utf8").split("\n");
const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

function test(word, constraint) {
  if (constraint[0] === "notInWord") return !word.includes(constraint[1]);
  if (constraint[0] === "notAtPos") {
    const [_, pos, letter] = constraint;
    return word.includes(letter) && word[pos] !== letter;
  }
  if (constraint[0] === "atPos") {
    const [_, pos, letter] = constraint;
    return word[pos] === letter;
  }
  return false;
}

function distinct(xs) {
  return [...new Set(xs)];
}

class Solver {
  constructor() {
    this.wordlist = wordlist.cache.all;
    this.constraints = [];
  }

  getPossibleWords() {
    return this.wordlist.filter((word) =>
      this.constraints.every((constraint) => test(word, constraint))
    );
  }
  guess(guess, out) {
    const newConstraints = [];
    var withoutB = "";
    for (let i = 0; i < guess.length; i++) {
      if (out[i] === "g") {
        newConstraints.push(["atPos", i, guess[i]]);
        withoutB += guess[i];
      } else if (out[i] === "y") {
        newConstraints.push(["notAtPos", i, guess[i]]);
        withoutB += guess[i];
      }
    }
    for (let i = 0; i < guess.length; i++) {
      if (out[i] === "b" && !withoutB.includes(guess[i])) {
        newConstraints.push(["notInWord", guess[i]]);
      }
    }
    this.constraints = this.constraints.concat(newConstraints);
  }

  getNextBestGuesses(n = 1) {
    const possible = this.getPossibleWords();

    const letterCounts = [...possible.join("")].reduce(
      (a, c) => (a[c] = a[c] + 1 || 1) && a,
      {}
    );

    const testedLetters = [];
    for (const constraint of this.constraints) {
      if (constraint[0] === "notInWord") testedLetters.push(constraint[1]);
      else testedLetters.push(constraint[2]);
    }
    const untested = alphabet.filter((l) => !testedLetters.includes(l));
    const l = untested.sort(
      (a, b) => (letterCounts[b] || 0) - (letterCounts[a] || 0)
    );

    if ((letterCounts[l[0]] || 0) <= 1) {
      var scoredCandidates = possible.map((word) => [
        word,
        topwords.indexOf(word) > -1 ? topwords.indexOf(word) : topwords.length,
      ]);
    } else {
      // pick word that has the most probable untested letters
      var scoredCandidates = possible.map((word) => {
        let score = 0;
        for (const letter of distinct(word))
          score += l.includes(letter) ? 1 / (l.indexOf(letter) + 1) : 0;

        //topwords are words that are used a lot, this is because wordle likes uses popular words
        if (topwords.includes(word)) score *= 2;

        return [word, score];
      });
    }
    scoredCandidates = scoredCandidates
      .sort((a, b) => b[1] - a[1])
      .map(([word, score]) => word);
    return scoredCandidates.slice(0, n);
  }

  getNextBestGuess() {
    return this.getNextBestGuesses(1)[0];
  }

  oldSolver(n = 1) {
    var possibleWords = this.getPossibleWords();

    let occur = this.findOccur(possibleWords);
    let freq = this.findPosFreq(possibleWords);

    possibleWords = possibleWords.map((word) => [word, this.findWeight(word, freq, occur)]).sort((a, b) => b[1] - a[1]).map(([word, weight]) => word);
    return possibleWords.slice(0, n);
  }

  nextOldSolver() {
    return this.oldSolver(1)[0];

  }

  findWeight(guess, freq, occur) {
    let weight = 0;
    let lets = guess.split("");
    lets.forEach((l, i) => (weight += freq[l][i + 1]));
    [...new Set(lets)].forEach((l) => {
      weight += occur[l];
    });
    return weight;
  }

  findOccur(possibleWords) {
    let occurencesByLetter = {};
    alphabet.forEach((letter) => {
      possibleWords.forEach((word) => {
        occurencesByLetter[letter] = occurencesByLetter[letter] || 0;
        occurencesByLetter[letter] += word.replace(
          new RegExp(`[^${letter}]`, "g"),
          ""
        ).length;
      });
    });
    return occurencesByLetter;
  }

  findPosFreq(possibleWords) {
    let freq = {};
    alphabet.forEach((l) => {
      freq[l] = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      };
    });
    possibleWords.forEach((word) => {
      let wl = word.split("");
      wl.forEach((letter, index) => {
        freq[letter][index + 1] += 1;
      });
    });
    return freq;
  }
}

module.exports = Solver;
