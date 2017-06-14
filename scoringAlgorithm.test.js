import {
  rankUsers,
  getRankingForAbsolutePoints,
  getPointsForSubmissions,
  getPointsForUsers,
  sumUserPoints,
} from './scoringAlgorithm';
import { sampleUsers, sampleGames, sampleSubmissions, sampleResult } from './scoringExample';

describe('rankUsers(users, games, submissions)', () => {
  it('works as expexted for normal dataset [blackbox]', () => {
    expect(rankUsers(sampleUsers, sampleGames, sampleSubmissions)).toEqual(sampleResult);
  });
});

describe('getRankingForAbsolutePoints(absolutePoints)', () => {
  it('turns array of points into map with correct ranks', () => {
    const absolutePoints = [10, 11, 11, 12, 13, 13, 13, 14];
    const correctResult = new Map([
      [10, 1],
      [11, 2],
      [12, 4],
      [13, 5],
      [14, 8],
      ['HIGHEST', 9],
    ]);
    const result = getRankingForAbsolutePoints(absolutePoints);
    result.forEach((value, key) => {
      expect(value).toEqual(correctResult.get(key));
    });
  });

  it('handles an empty array', () => {
    const absolutePoints = [];
    const result = getRankingForAbsolutePoints(absolutePoints);

    expect(result.get('HIGHEST')).toEqual(1);
  });

  it('throws if no array is passed', () => {
    expect(() => { getRankingForAbsolutePoints(); }).toThrow();
  });

  it('throws if an array with non-numeric elements is passed', () => {
    const elements = [1, 2, 2, 3, 3, 3, 'Foo', 'Bar', 'Foo'];
    expect(() => { getRankingForAbsolutePoints(elements); }).toThrow();
  });
});

describe('getPointsForSubmissions(submissions, game)', () => {
  it('returns the points for a set of submissions', () => {
    const game = { answer: 200 };
    const submissions = [
      { guess: 0 },
      { guess: 100 },
      { guess: 200 },
      { guess: 300 },
      { guess: 400 },
      { guess: 500 },
    ];
    const correctResult = new Map([
      [0, 1],
      [100, 2],
      [200, 4],
      [300, 6],
      ['HIGHEST', 7],
    ]);

    const result = getPointsForSubmissions(submissions, game);
    result.forEach((value, key) => {
      expect(value).toEqual(correctResult.get(key));
    });
  });

  it('handles empty submissions', () => {
    const game = { answer: 200 };
    const submissions = [];
    const result = getPointsForSubmissions(submissions, game);

    expect(result.get('HIGHEST')).toEqual(1);
  });

  it('throws if game answer is not defined', () => {
    const submissions = [{ guess: 100 }];
    expect(() => { getPointsForSubmissions(submissions); }).toThrow();
  });
});

describe('sumUserPoints(userPoints)', () => {
  it('correctly sums points in array', () => {
    const unorderedMaps = [
      new Map([
        [110, 10],
        [120, 20],
        [130, 30],
      ]),
      new Map([
        [110, 100],
        [120, 100],
        [130, 100],
      ]),
    ];
    const correctResult = new Map([
      [110, 110],
      [120, 120],
      [130, 130],
    ]);
    const result = sumUserPoints(unorderedMaps);
    expect(result.size).toEqual(correctResult.size);
    result.forEach((value, key) => {
      expect(value).toEqual(correctResult.get(key));
    });
  });

  it('correctly sums points if one map does not have all submissions', () => {
    const unorderedMaps = [
      new Map([
        [110, 10],
        [120, 20],
      ]),
      new Map([
        [110, 100],
        [120, 100],
        [130, 100],
      ]),
    ];
    const correctResult = new Map([
      [110, 110],
      [120, 120],
      [130, 100],
    ]);
    const result = sumUserPoints(unorderedMaps);
    expect(result.size).toEqual(correctResult.size);
    result.forEach((value, key) => {
      expect(value).toEqual(correctResult.get(key));
    });
  });

  it('correctly handles an empty array', () => {
    const empty = [];
    const result = sumUserPoints(empty);

    expect(result.size).toEqual(0);
  });
});
