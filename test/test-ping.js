import request from 'request';
import { expect } from 'chai';
import server from '../server';

describe('Server', () => {
  after(() => {
    server.close();
  });
  describe('GET /api/v1/ping', () => {
    const data = {};
    before((done) => {
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
      expect(data.status).to.equal(200);
    });
    it('respond with pong', () => {
      expect(data.body).to.equal('pong');
    });
  });
});
