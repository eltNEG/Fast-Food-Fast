import request from "request";
import { expect, assert } from "chai";
import db from '../db'

describe("Api v1 authentication route", () => {
  const baseURL = "http://localhost:3000/api/v1";
  let admin = {};
  let user = {};

  describe("POST /auth/signup", () => {
    const data = {};
    before(done => {
      request.post(
        `${baseURL}/auth/signup`,
        {
          json: {
            username: "2testuser",
            password: "1testuser"
          }
        },
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = body;
          done();
        }
      );
    });
    
    it("returns status code 201", () => {
      expect(data.status).to.equal(201);
    });
    it("returns a message - user succesfully created", () => {
        expect(data.body.message).to.equal('user succesfully created');
    });
    it("returns suscess", () => {
        expect(data.body.success).to.equal(true);
    });
  });
});
