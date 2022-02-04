var Solver = require("../Solver")
var solver = new Solver();

solver.guess("raise", "bbybb")
solver.guess("hotly", "ybybb")
solver.guess("twang", "ybbyy")
console.log(solver.nextBestv3())