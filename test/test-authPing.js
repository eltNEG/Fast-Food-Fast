import request from 'request';
import { expect, assert } from 'chai';

describe('Test authPing route', () => {
  const baseURL = 'http://localhost:3000/api/v1';
  describe('POST /api/v1/auth/ping with no auth token', () => {
    const data = {};
    const options = {
      headers: {
        Authorization: '',
        'Content-Type': 'application/json',
      },
    };

    before((done) => {
      request.post(`${baseURL}/auth/ping`, options, (error, response, body) => {
        data.status = response.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });

    it('returns status code 403', () => {
      expect(data.status).to.equal(403);
    });
    it('returns data.success = false', () => {
      expect(data.body.success).to.equal(false);
    });
    it("returns 'No authorization token provided'", () => {
      expect(data.body.message).to.equal('No authorization token provided');
    });
  });

  describe('POST /api/v1/auth/ping with bad auth token', () => {
    const data = {};
    const options = {
      headers: {
        Authorization: 'Bearer bad.auth.token',
        'Content-Type': 'application/json',
      },
    };

    before((done) => {
      request.post(`${baseURL}/auth/ping`, options, (error, response, body) => {
        data.status = response.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it('returns status code 403', () => {
      expect(data.status).to.equal(403);
    });
    it('returns data.success = false', () => {
      console.log(data.body);
      expect(data.body.success).to.equal(false);
    });
    it("returns 'Invalid token'", () => {
      expect(data.body.message).to.equal('Invalid token');
    });
  });

  describe('GET /api/v1/auth/ping', () => {
    const getData = {};
    const postData = {};
    const options = {
      headers: {
        Authorization: '',
        'Content-Type': 'application/json',
      },
    };

    before((done) => {
      request.get(`${baseURL}/auth/ping`, options, (error, response, body) => {
        getData.status = response.statusCode;
        getData.body = JSON.parse(body);

        options.headers.Authorization = getData.body.token;
        request.post(
          `${baseURL}/auth/ping`,
          options,
          (error2, response2, body2) => {
            postData.status = response2.statusCode;
            postData.body = JSON.parse(body2);
            done();
          },
        );
      });
    });

    it('returns status code 200', () => {
      expect(getData.status).to.equal(200);
    });

    it('returns data.success = true', () => {
      expect(getData.body.success).to.equal(true);
    });

    it('returns string token', () => {
      assert(typeof getData.body.token, 'string');
    });

    it('returns status code 200', () => {
      expect(postData.status).to.equal(200);
    });

    it('returns data.success = true', () => {
      expect(postData.body.success).to.equal(true);
    });

    it('returns message pong', () => {
      expect(postData.body.message).to.equal('pong');
    });
  });
});
