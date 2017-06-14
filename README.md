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

## How does it work?
First we have to answer how the basic ranking algorithm works. For every game, users get points. The more points a user has the worse he is. The user with the least points is the best.
For every game, the submissions are compared with the actual answers. For each submissions, we calculate the deviation to the answer. The best user gets 1 points, the second 2 and so on. If two users have the same deviation they get the same points, but the following user then gets two points more instead of one.
Now all points are summed and the same algorithm is applied to the ranks.

### Example
Imagine we have a game that looks like this:

```js
{
  id: 1,
  question: 'How many things are there in the universe?',
  answer: 400,
}
```

Now we have four submissions by four different users for that game:
```js
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
}
```

If we calculate the deviation and apply the algorithm we get this:
```js
{
  userId: 101,
  deviation: 100,
  points: 4,
},
{
  userId: 102,
  deviation: 50,
  points: 2,
},
{
  userId: 103,
  deviation: 0,
  points: 1,
},
{
  userId: 104,
  deviation: 50,
  points: 2,
}
```

As you can see, because two users had the same deviation they got the same amount of points. The following user got one more, it's like there's a gap between them.


Now we sum all the points for every game and can treat them like if they were points and apply the same calculation. We can get a result that might look like this:

```js
{
  userId: 101,
  points: 40,
  rank: 1,
},
{
  userId: 102,
  points: 40,
  rank: 1,
},
{
  userId: 103,
  points: 48,
  rank: 3,
},
{
  userId: 104,
  points: 52,
  rank: 4,
}
```
