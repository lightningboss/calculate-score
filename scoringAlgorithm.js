export function getRanking(users, games, submissions) {
  const unorderedUserPoints = games.map(game => getPointsForUsers(users, game, submissions));

  const summedUserPoints = sumUserPoints(unorderedUserPoints);
  const listOfPoints = [];

  // Add only points to array, no user information
  summedUserPoints.forEach(userPoints => listOfPoints.push(userPoints));
  const ranks = mapAbsolutePointsToRanking(listOfPoints);

  return users.map((user) => {
    const userId = user.userId;
    const points = summedUserPoints.get(user.userId);
    const rank = ranks.get(points);
    return { userId, points, rank };
  });
}

export function addItemToMap(key, value, map) {
  if (map.has(key)) {
    map.set(key, map.get(key) + value);
  } else {
    map.set(key, value);
  }
}

export function sumUserPoints(userPoints) {
  const summedUserPoints = new Map();
  userPoints.forEach((x) => {
    x.forEach((value, key) => addItemToMap(key, value, summedUserPoints));
  });

  return summedUserPoints;
}

export function getPointsForUsers(users, game, submissions) {
  const userPoints = new Map();
  const gameSubmissions = filterSubmissionsForGame(game.id, submissions);
  const pointsToRanking = mapSubmissionsToPoints(gameSubmissions, game);
  users.forEach((user) => {
    const userGuess = gameSubmissions.filter(submission => submission.userId === user.userId)[0];
    if (userGuess) {
      const userDeviation = getDeviation(userGuess.guess, game.answer);
      const pointsForGuess = pointsToRanking.get(userDeviation);
      addItemToMap(user.userId, pointsForGuess, userPoints);
    } else {
      addItemToMap(user.userId, pointsToRanking.get('HIGHEST'), userPoints);
    }
  });

  return userPoints;
}

export function mapSubmissionsToPoints(submissions, game) {
  const deviations = submissions.map(submission => getDeviation(game.answer, submission.guess));
  return mapAbsolutePointsToRanking(deviations);
}

export function filterSubmissionsForGame(gameId, submissions) {
  return submissions.filter(submission => submission.gameId === gameId);
}

export function getDeviation(n, m) {
  return Math.abs(n - m);
}

export function mapAbsolutePointsToRanking(absolutePoints) {
  // Turns array  [10, 11, 11, 12, 13, 13, 13, 14]
  // into  map    { 10: 1, 11: 2, 12: 4, 13: 5, 14: 8 }
  const points = absolutePoints.sort((a, b) => a - b);
  const numberOfOccurences = getNumberOfOccurencies(points);
  const ranking = new Map();

  let rankCounter = 1;
  numberOfOccurences.forEach((value, absolutePoint) => {
    ranking.set(absolutePoint, rankCounter);
    rankCounter += value;
  });

  ranking.set('HIGHEST', rankCounter);

  return ranking;
}

export function getNumberOfOccurencies(elements) {
  const uniqueValues = [...new Set(elements)];
  return new Map(uniqueValues.map((val) => {
    const occurencies = elements.filter(element => element === val).length;
    return [val, occurencies];
  }));
}

export function getNumberOfOccurencies2(elements) {
  const numberOfOccurences = new Map();
  elements.forEach((element) => {
    const NEW_OCCURENCY = 1;
    addItemToMap(element, NEW_OCCURENCY, numberOfOccurences);
  });

  return numberOfOccurences;
}
