import request from 'request';
import { expect } from 'chai';
import server from '../server';

describe('Ping Server', () => {
  const baseURL = 'http://localhost:3000/api/v1';
  after(() => {
    server.close();
  });
  describe('GET /api/v1/ping', () => {
    const data = {};
    before((done) => {
      request.get(
        `${baseURL}/ping`,
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = JSON.parse(body);
          done();
        },
      );
    });
    it('returns status code 200', () => {
      expect(data.status).to.equal(200);
    });
    it('respond with pong', () => {
      expect(data.body.message).to.equal('pong');
    });
  });
});
