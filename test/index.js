var Solver = require("../Solver")
var solver = new Solver();

solver.guess("arose", "bybby");
solver.guess("tired", "bbygb");
solver.guess("ruler", "gbygb");
solver.guess("refel", "ggbgg");
solver.guess("repel", "ggbgg");
console.log(solver.getNextBestGuess());