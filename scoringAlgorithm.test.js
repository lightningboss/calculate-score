import { rankUsers } from './scoringAlgorithm';
import { sampleUsers, sampleGames, sampleSubmissions, sampleResult } from './scoringExample';

describe('rankUsers(users, games, submissions)', () => {
  it('works as expexted for normal dataset [blackbox]', () => {
    expect(rankUsers(sampleUsers, sampleGames, sampleSubmissions)).toEqual(sampleResult);
  });
});
