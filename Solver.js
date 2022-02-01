
var wordlist = require("wordle-wordlist")

class Solver {

  constructor() {
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