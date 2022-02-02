var Solver = require("../Solver")

var fs = require("fs")
var wordlist = require("wordle-wordlist").cache.all
function  guess(word, guess) {
    var out = ""
    for(var i = 0; i< 5; i++) {
      if(word.charAt(i) == guess.charAt(i)) out+="g"
       else if(word.charAt(i) != guess.charAt(i) && word.includes(guess.charAt(i))) out+="y"
       else out+="b"
    }
    return out
  }
function trysolve(word) { 

var yo = new Solver()
yo.wordlist = wordlist
var solved = false
var tries = 0;

while(!solved && yo.wordlist.length > 0) {
    if(yo.wordlist.length == 1 && yo.wordlist[0] == word) solved = true 
  yo.filter(yo.wordlist[0], guess(word, yo.wordlist[0]))
   tries += 1


}
return [tries, solved]
}


var couldntbesolved = 0;
var solved = 0;
var triesarr = [];

console.log(trysolve("moods"))