import request from "request";
import { expect, assert } from "chai";

describe("Test signup route", () => {
  const baseURL = "http://localhost:3000/api/v1";
  describe("POST /signup", () => {
    const data = {};
    const options = {
      headers: {
        Authorization: "",
        "Content-Type": "application/json"
      },
      body: {
        password: "test_user",
        username: "test_user11"
      },
      json: true
    };
    before(done => {
      request.post(
        `${baseURL}/auth/signup`,
        options,
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = JSON.parse(body);
          done();
        }
      );
    });

    it("returns status code 201", () => {
      console.log(data);
      expect(data.status).to.equal(201);
    });
  });
});
