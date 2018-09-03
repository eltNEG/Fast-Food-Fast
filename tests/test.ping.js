import request from 'request';
import server from '../server';

describe('Server', () => {
  afterAll(() => {
    server.close();
  });
  describe('GET /api/v1/ping', () => {
    const data = {};
    beforeAll((done) => {
      request.get(
        'http://localhost:3000/api/v1/ping',
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = body;
          done();
        },
      );
    });
    it('returns status code 200', () => {
      expect(data.status).toBe(200);
    });
    it('respond with pong', () => {
      expect(data.body).toBe('pong');
    });
  });
});
