var Solver = require("../Solver")
var solver = new Solver()
solver.populate().then(() => {
console.log(solver.wordlist)
console.log(solver.findBestGuess())
solver.filter("tares", "gbbyy")
console.log(solver.findBestGuess())
})