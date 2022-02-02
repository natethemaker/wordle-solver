var Solver = require("../Solver")

var fs = require("fs")
var wordli

function trysolve(word) { 

var yo = new Solver()
var solved = false
var tries = 0;

while(!solved && yo.wordlist.length > 0) {
    if(yo.wordlist.length == 1 && yo.wordlist[0] == word) solved = true 
  yo.filter(yo.wordlist[0], yo.guess(word, yo.wordlist[0]))
   tries += 1


}
return [tries, solved]
}


var couldntbesolved = 0;
var solved = 0;
var triesarr = [];

list.forEach((word,i) => {
  var solvedy = trysolve(word)
  if(solvedy[1]) solved++
  else couldntbesolved++

  if(solvedy[1]) triesarr.push(solvedy[0])
})

console.log(solved, couldntbesolved)
const average = (array) => array.reduce((a, b) => a + b) / array.length;
console.log((triesarr))