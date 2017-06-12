import { getRanking } from './scoringAlgorithm';
import { sampleUsers, sampleGames, sampleSubmissions, sampleResult } from './scoringExample';

describe('getRanking(users, games, submissions)', function() {
    it('works as expexted [blackbox]', function() {
        expect(getRanking(sampleUsers, sampleGames, sampleSubmissions)).toEqual(sampleResult);
    });
});
