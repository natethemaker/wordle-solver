
var wordlist = require("wordle-wordlist")

var letterArray = "abcdefghijklmnopqrstuvwxyz".split("")

class Solver {

  constructor() {
    this.letterBlacklist = [];
    this.whitelistedLettersAtWrongPosition = {1: [], 2: [], 3: [], 4: [], 5: []};
    this.letterWhitelist = [];
    this.whitelistedLettersAtRitPosition = {};
    this.guess = 0;
  }

findWeight(guess, freq, occur) {
  let weight = 0;
  let lets = guess.split("");
  lets.forEach((l, i)=> weight += freq[l][i+1]);
  [...new Set(lets)].forEach((l) => {weight += occur[l]});
  return weight;
}

findBestGuess() {
  let bestGuess;
  let neededWeight = Number.MIN_VALUE; 

  let occur = this.findOccur(this.wordlist);
  let freq = this.findPosFreq(this.wordlist);

  this.wordlist.forEach((guess) => {
    let weight = this.findWeight(guess, freq, occur);

    if(weight > neededWeight) {
      bestGuess = guess;
      neededWeight =weight;
    }
  })
  return bestGuess;
  
}
  findOccur() {
    let occurencesByLetter = {};
    letterArray.forEach((letter) => {
      this.wordlist.forEach((word) => {
        occurencesByLetter[letter] = occurencesByLetter[letter] || 0;
        occurencesByLetter[letter] += word.replace(new RegExp(`[^${letter}]`, "g"), "").length
      })
    })
    return occurencesByLetter;
  }

  findPosFreq() {
    let freq = {};
   letterArray.forEach((l) => { 
      freq[l] = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
      }
    });
    this.wordlist.forEach((word)=>{
      let wl = word.split("");
      wl.forEach((letter, index) => {
        freq[letter][index + 1] += 1;
      })
    });
    return freq;
  }

  async populate(type="all") {
    if(type == "guesses")  this.wordlist = await wordlist.guesses()
        if(type == "all")  this.wordlist = await wordlist.all()
                if(type == "answers")  this.wordlist = await wordlist.answers()
  }

  filter(guess, output) {
    for(var i=0; i<5; i++) {
      var out = output.charAt(i)
      var guesslet = guess.charAt(i)

      if(out == "g") this.wordlist = this.wordlist.filter(e=>e.charAt(i) == guesslet)

      if(out == "y") this.wordlist = this.wordlist.filter(e=>e.charAt(i) != guesslet &&e.includes(guesslet))

      if(out == "b") this.wordlist = this.wordlist.filter(e=>!e.includes(guesslet))
    }
  }
  
  guess(word, guess) {
    var out = ""
    for(var i = 0; i< 5; i++) {
      if(word.charAt(i) == guess.charAt(i)) out+="g"
       else if(word.charAt(i) != guess.charAt(i) && word.includes(guess.charAt(i))) out+="y"
       else out+="b"
    }
    return out
  }
}

module.exports =  Solver