import request from 'request';
import { expect } from 'chai';

describe('Api v1 authentication route', () => {
  const baseURL = 'http://localhost:3000/api/v1';

  describe('POST /auth/signup', () => {
    const data = {};
    before((done) => {
      request.post(
        `${baseURL}/auth/signup`,
        {
          json: {
            username: '2testuser',
            password: '1testuser',
          },
        },
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = body;
          done();
        },
      );
    });

    it.skip('returns status code 201', () => {
      expect(data.status).to.equal(201);
    });
    it.skip('returns a message - user succesfully created', () => {
      expect(data.body.message).to.equal('user succesfully created');
    });
    it.skip('returns suscess', () => {
      expect(data.body.success).to.equal(true);
    });
  });

  describe('POST /auth/login', () => {
    const data = {};
    before((done) => {
      request.post(
        `${baseURL}/auth/login`,
        {
          json: {
            username: 'testuser',
            password: 'testuser',
          },
        },
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
    it('returns a message - user found', () => {
      expect(data.body.message).to.equal('user found');
    });
    it('returns suscess', () => {
      expect(data.body.success).to.equal(true);
    });
  });
});
