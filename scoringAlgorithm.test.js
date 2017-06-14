import { getRanking } from './scoringAlgorithm';
import { sampleUsers, sampleGames, sampleSubmissions, sampleResult } from './scoringExample';

describe('getRanking(users, games, submissions)', () => {
  it('works as expexted [blackbox]', () => {
    expect(getRanking(sampleUsers, sampleGames, sampleSubmissions)).toEqual(sampleResult);
  });
});
