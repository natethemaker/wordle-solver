var Solver = require("../Solver")
var solver = new Solver()
solver.populate().then(() => {
console.log(solver.wordlist)
})