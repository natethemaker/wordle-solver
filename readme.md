# Wordle Solver

This is a simple wordle helper / solver.

This project isn't finished yet and still is a WIP.

## Usage (beta)

First install the package

```
npm i wordle-solver
```

Then import the Solver class, it's  a little helper for filtering out words.

```
var Solver = require("wordle-solver")
```

Create a new instance of it, it will automatically fetch the wordlist.

```
var solver = new Solver()
```

If you want to fetch the current wordlist, do
```
solver.populate(type)
```
type is a string, and it can be "guesses", "all", or "answers"

this function returns a promise, so make sure to use it in an async function or use `then` and `catch` to handle when its completed.


You can access or modify the current wordlist by doing:

```
solver.wordlist
```
Now, for the cool part

You can filter the wordlist by doing:

```
solver.filter(word, output)
```
`word` is a string containing the 5 letter word that was guessed.

`output` is a string containing the output of that word.

For example:

This game:

![game](https://i.imgur.com/5Kw5Lr7.png)

Would be written as:

![code](https://i.imgur.com/w2qCAJe.png)

This will log an array with the remaining possible words.

## Todo

- Rank words in wordlist based on probability