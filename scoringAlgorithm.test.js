import { rankUsers, getRankingForAbsolutePoints } from './scoringAlgorithm';
import { sampleUsers, sampleGames, sampleSubmissions, sampleResult } from './scoringExample';

describe('rankUsers(users, games, submissions)', () => {
  it('works as expexted for normal dataset [blackbox]', () => {
    expect(rankUsers(sampleUsers, sampleGames, sampleSubmissions)).toEqual(sampleResult);
  });
});

describe('getRankingForAbsolutePoints(absolutePoints)', () => {
  it('turns array of points into map with correct ranks', () => {
    const absolutePoints = [10, 11, 11, 12, 13, 13, 13, 14];
    const correctMap = new Map([
      [10, 1],
      [11, 2],
      [12, 4],
      [13, 5],
      [14, 8],
      ['HIGHEST', 9],
    ]);
    const result = getRankingForAbsolutePoints(absolutePoints);
    result.forEach((value, key) => {
      expect(value).toEqual(correctMap.get(key));
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
