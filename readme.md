# Wordle Solver


This is a simple wordle helper / solver.

This is still in development, so expect breaking changes with every update.

This module comes with 3 algorithms, all very good at solving wordle.

![npm](https://img.shields.io/npm/dt/wordle-solver.png)

![npm](https://img.shields.io/npm/dm/wordle-solver.png)

## Usage

First install the package

```
npm i wordle-solver
```

Then import the Solver class, it's what does all the heavy lifting.

```
var Solver = require("wordle-solver")
```

Create a new instance of it.

```
var solver = new Solver()
```

This will automatically create a new Solver and populate it with the latest wordlist. 

If you ever want to modify or look at the wordlist, you can use:

```
solver.wordlist
```
Now, for the cool part

You can filter the wordlist by doing:

```
solver.guess(word, output)
```
`word` is a string containing the 5 letter word that was guessed.

`output` is a string containing the output of that word.

For example:

This game:

![game](https://i.imgur.com/5Kw5Lr7.png)

Would be written as:

![code](https://i.imgur.com/w2qCAJe.png)

This will log an array with the remaining possible words.

## filtering the wordlist

For your convenience, this module offers an easy way to get the possible solutions based on your previous guesses. 

You can retrieve this with:

```
solver.getPossibleWords() //returns array
```
If you want to find the best guess to play, keep reading.

## solving the puzzle

like I mentioned before, this module comes with 3 different wordle solving algorithms. 

i will explain how to use them below

### experimental algorithm:

this is an algorithm inspired by Tom Neil. it's pretty good but it's not fully completed yet. i don't think i will ever get to completing it.

To find the next best guess at any given state:

```
solver.nextBestv3()
```

### latest algorithm:

this was an algorithm i saw, inspired from Max Kreminski. I ported it to work with this module. it's able to solve most words pretty quickly.

To find the next best guess at any given state:

```
solver.getNextBestGuess()
```
This will return a string containing the best next word to play. 

You can also get an array of the best guesses, sorted from best to least, with:

```
solver.getNextBestGuesses(n)
```
In the above example, n is the number of guesses to fetch. If you wanted the top 10 guesses, you would put 10 instead of n.


### old algorithm:

this was the first algorithm I created. it works by assigning weights based by probability. it isn't that good but you can still use it nevertheless.

To find the next best guess at any given state:

```
solver.nextOldSolver()
```
This will return a string containing the best next word to play. 

You can also get an array of good guesses, sorting from best to least, with:

```
solver.oldSolver(n)
```
In the above example, n is the number of guesses to fetch. If you wanted the top 10 guesses, you would put 10 instead of n.

## contributing

if you find this useful, please leave a star on github!

if you find any bugs with this, please open an issue.

you can also submit a pull request to add new features!