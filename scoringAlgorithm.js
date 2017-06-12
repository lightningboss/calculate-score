function getRanking(users, games, submissions) {
    const userPoints = new Map();
    games.forEach((game) => {
        const gameSubmissions = filterSubmissionsForGame(game.id, submissions);
        const deviations = gameSubmissions.map(submission => getDeviation(game.answer, submission.guess));
        const pointsToRanking = mapAbsolutePointsToRanking(deviations);

        users.forEach((user) => {
            const userGuess = gameSubmissions.filter(submission => submission.userId === user.userId)[0];
            if (userGuess) {
                const pointsForGuess = pointsToRanking.get(userGuess.guess);
                userPoints.has(user.userId)
                ? userPoints.set(user.userId, userPoints.get(user.userId) + pointsForGuess)
                : userPoints.set(user.userId, pointsForGuess);

                console.log(userGuess, user, game);
            } else {
                userPoints.has(user.userId)
                ? userPoints.set(user.userId, userPoints.get(user.userId) + pointsToRanking.get('HIGHEST'))
                : userPoints.set(user.userId, pointsToRanking.get('HIGHEST'));
            }
        });
    })

    return userPoints;
}

function filterSubmissionsForGame(gameId, submissions) {
    return submissions.filter(submission => submission.gameId === gameId);
}

function getDeviation(n, m) {
    return Math.abs(n - m);
}

function mapAbsolutePointsToRanking(absolutePoints) {
    // Turns array  [10, 11, 11, 12, 13, 13, 13, 14]
    // into  map    { 10: 1, 11: 2, 12: 4, 13: 5, 14: 8 }
    const points = absolutePoints.sort((a , b) => a - b);
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

function getNumberOfOccurencies(elements) {
    const uniqueValues = [...new Set(elements)];
    return new Map(uniqueValues.map(val => {
        const occurencies = elements.filter(element => element === val).length;
        return [val, occurencies]
    }));
}

function getNumberOfOccurencies2(elements) {
    const numberOfOccurences = new Map();
    elements.forEach(element => {
        numberOfOccurences.has(element)
        ? numberOfOccurences.set(element, numberOfOccurences.get(element) + 1)
        : numberOfOccurences.set(element, 1);
    });

    return numberOfOccurences;
}
