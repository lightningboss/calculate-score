# Calculate Score

This is the advanced scoring algorithm used by famous apps like the 'Wer besiegt Paul?' live game.

## Usage
The algorithm expects three arguments: `users`, `games` and `submissions`. They take the following shape:

```js
const users = [
  {
    userId: 101,
    firstName: 'Jonas',
    lastName: 'Klein',
  },
  {
    userId: 102,
    firstName: 'Paul',
    lastName: 'Aurin',
  },
  // ...
];

const games = [
  {
    id: 1,
    question: 'How many things are there in the universe?',
    answer: 400,
  },
  {
    id: 2,
    question: 'How many objects does JavaScript have?',
    answer: 1000,
  },
  // ...
];

const submissions = [
  {
    id: 1,
    gameId: 1,
    userId: 101,
    guess: 300,
  },
  {
    id: 2,
    gameId: 1,
    userId: 102,
    guess: 350,
  },
  {
    id: 3,
    gameId: 2,
    userId: 103,
    guess: 400,
  },
  {
    id: 4,
    gameId: 3,
    userId: 104,
    guess: 450,
  },
  // ...
];
```

You now can use `rankUsers`:

```js
const rankedUsers = rankUsers(users, games, submissions);
// returns a result similar to this:

[
  {
    userId: 101,
    rank: 1,
    points: 6,
  },
  {
    userId: 102,
    rank: 3,
    points: 7,
  },
  {
    userId: 103,
    rank: 4,
    points: 8,
  },
  // ...
];
```
