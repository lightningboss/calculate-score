import { addItemToMap, getDeviation, getNumberOfOccurences } from './helpers';

export function rankUsers(users, games, submissions) {
  const unorderedUserPoints = games.map(game => (
    getAbsoluteUserPointsForGame(users, game, submissions)
  ));
  const summedPointsForUsers = sumPoints(unorderedUserPoints);
  const listOfAllPoints = []; // Add only each userPoints to array, no user information
  summedPointsForUsers.forEach(userPoints => listOfAllPoints.push(userPoints));
  const ranks = getRankingForAbsolutePoints(listOfAllPoints);

  return users.map(({ userId }) => {
    const points = summedPointsForUsers.get(userId);
    const rank = ranks.get(points);
    return { userId, points, rank };
  });
}

export function sumPoints(unorderedPoints) {
  const summedPoints = new Map();
  unorderedPoints.forEach((individualPoints) => {
    individualPoints.forEach((points, userId) => addItemToMap(userId, points, summedPoints));
  });

  return summedPoints;
}

export function getAbsoluteUserPointsForGame(users, game, submissions) {
  const userPoints = new Map();
  const gameSubmissions = submissions.filter(submission => submission.gameId === game.id);
  const pointsToRanking = getAbsolutePointsForSubmissions(gameSubmissions, game);

  users.forEach(({ userId }) => {
    const userGuess = gameSubmissions.find(submission => submission.userId === userId);
    if (userGuess) {
      const userDeviation = getDeviation(userGuess.guess, game.answer);
      const pointsForGuess = pointsToRanking.get(userDeviation);
      addItemToMap(userId, pointsForGuess, userPoints);
    } else {
      addItemToMap(userId, pointsToRanking.get('HIGHEST'), userPoints);
    }
  });

  return userPoints;
}

export function getAbsolutePointsForSubmissions(submissions, game) {
  const deviations = submissions.map(submission => getDeviation(game.answer, submission.guess));
  return getRankingForAbsolutePoints(deviations);
}

export function getRankingForAbsolutePoints(absolutePoints) {
  // Turns array  [10, 11, 11, 12, 13, 13, 13, 14]
  // into  map    { 10 => 1, 11 => 2, 12 => 4, 13 => 5, 14 => 8, 'HIGHEST' => 9 }

  if (
    !(absolutePoints instanceof Array)
    || absolutePoints.some(el => typeof el !== 'number')
  ) throw new Error('You have to pass an array of numbers');

  const points = absolutePoints.sort((a, b) => a - b); // sort in ascending order
  const numberOfOccurences = getNumberOfOccurences(points);
  const ranking = new Map();

  let rankCounter = 1;
  numberOfOccurences.forEach((occurences, absolutePoint) => {
    ranking.set(absolutePoint, rankCounter);
    rankCounter += occurences;
  });

  ranking.set('HIGHEST', rankCounter);

  return ranking;
}
