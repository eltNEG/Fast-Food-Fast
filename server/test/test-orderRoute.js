import request from 'request';
import { expect, assert } from 'chai';

describe('Api v1 Server', () => {
  const baseURL = 'http://localhost:3000/api/v1';
  let admin = {};
  let user = {};
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
        user = body;
        user = body;
      },
    );
    request.post(
      `${baseURL}/auth/login`,
      {
        json: {
          username: 'admin1',
          password: 'secret',
        },
      },
      (error, response, body) => {
        admin = body;
        done();
      },
    );
  });

  describe('GET /orders', () => {
    const data = {};
    before((done) => {
      const options = {
        headers: {
          Authorization: admin.token,
          'Content-Type': 'application/json',
        },
      };
      request.get(`${baseURL}/orders`, options, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('returns status code 200', () => {
      expect(data.status).to.equal(200);
    });

    it('responds with json ', () => {
      assert(typeof data.body, 'json');
    });
  });

  describe('POST /orders - form', () => {
    const data = {};
    before((done) => {
      const options = {
        headers: {
          Authorization: user.token,
          'Content-Type': 'application/json',
        },
        json: {
          customerName: 'test name2',
          customerAddress: 'test address2',
          foodOrdered: 'test food2',
        },
      };
      request.post(`${baseURL}/orders`, options, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('returns status code 201', () => {
      expect(data.status).to.equal(201);
    });
    it('returns json', () => {
      assert(typeof data.body, 'json');
    });
  });

  describe('POST /orders - json', () => {
    const data = {};
    before((done) => {
      const options = {
        headers: {
          Authorization: user.token,
          'Content-Type': 'application/json',
        },
        json: {
          customerName: 'test name2',
          customerAddress: 'test address2',
          foodOrdered: 'test-food2',
        },
      };
      request.post(`${baseURL}/orders`, options, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('returns status code 201', () => {
      expect(data.status).to.equal(201);
    });
    it('returns json', () => {
      assert(typeof data.body, 'json');
    });
  });

  describe('POST /orders - bad json', () => {
    const data = {};
    before((done) => {
      const options = {
        headers: {
          Authorization: user.token,
          'Content-Type': 'application/json',
        },
        json: {
          customer: 'test name4',
          customerAddress: 'test address4',
          foodOrdered: 'test-food2',
        },
      };
      request.post(`${baseURL}/orders`, options, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('returns status code 400', () => {
      expect(data.status).to.equal(400);
    });
    it('returns json', () => {
      assert(typeof data.body, 'json');
    });
    it('returns error mesaage: invalid parameters', () => {
      expect(data.body.error).to.equal('incomplete parameters');
    });
  });

  describe('GET /orders/1', () => {
    const data = {};
    before((done) => {
      const options = {
        headers: {
          Authorization: admin.token,
          'Content-Type': 'application/json',
        },
      };
      request.get(`${baseURL}/orders/1`, options, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('returns status code 200', () => {
      expect(data.status).to.equal(200);
    });
    it('returns json', () => {
      assert(typeof data.body, 'json');
    });
    it('returns orderId of 1', () => {
      const data2 = JSON.parse(data.body);
      expect(data2.order.orderid).to.equal(1);
    });
  });

  /*
  describe("GET /order/<orderId> - out of range", () => {
    const data = {};
    before(done => {
      request.get(`${baseURL}/order/100000`, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it("returns status code 400", () => {
      expect(data.status).to.equal(400);
    });
    it("returns json", () => {
      assert(typeof data.body, "json");
    });
    it.skip("returns error message", () => {
      const data2 = JSON.parse(data.body);
      expect(data2.message).to.equal("no order with order id 100000");
    });
  });
  */

  describe('PUT /orders - update status', () => {
    const data = {};
    before((done) => {
      const options = {
        headers: {
          Authorization: admin.token,
          'Content-Type': 'application/json',
        },
        json: {
          customerName: 'test name4',
          customerAddress: 'test address4',
          foodOrdered: 'test-food2',
          orderStatus: 'new',
        },
      };
      request.post(`${baseURL}/orders`, options, (error, response, body) => {
        const { orderid } = body.order;
        request.put(
          `${baseURL}/orders/${orderid}`,
          options,
          (error2, response2, body2) => {
            data.status = response2.statusCode;
            data.body = body2;
            done();
          },
        );
      });
    });
    it('returns status code 201', () => {
      expect(data.status).to.equal(201);
    });
    it('returns a json response', () => {
      assert(typeof data.body, 'json');
    });
  });

  /*
  describe("PUT /orders - update completed-status", () => {
    const data = {};
    before(done => {
      request.post(
        `${baseURL}/orders`,
        {
          json: {
            customerName: "test name4",
            customerAddress: "test address4",
            foodOrdered: "test-food2"
          }
        },
        (error, response, body) => {
          const { orderId } = body.order;
          request.put(
            `${baseURL}/order/${orderId}`,
            {
              json: {
                completed: true,
                orderStatus: "accepted"
              }
            },
            (error2, response2, body2) => {
              data.status = response2.statusCode;
              data.body = body2;
              done();
            }
          );
        }
      );
    });
    it("returns status code 201", () => {
      expect(data.status).to.equal(201);
    });

    it("returns status a json", () => {
      assert(typeof data.body, "json");
    });
  });
  */

  /*
  describe("PUT /orders - reject order with update status error", () => {
    const data = {};
    before(done => {
      request.put(
        `${baseURL}/order/100`,
        {
          json: {
            orderStatus: "rejected"
          }
        },
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = body;
          done();
        }
      );
    });
    it("returns status code 400", () => {
      expect(data.status).to.equal(404);
    });

    it("returns error message", () => {
      expect(data.body.message).to.equal("order not found");
    });
  });


  describe("PUT /orders - reject order with update-completed error", () => {
    const data = {};
    before(done => {
      request.put(
        `${baseURL}/order/100`,
        {
          json: {
            completed: true
          }
        },
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = body;
          done();
        }
      );
    });
    it("returns status code 400", () => {
      expect(data.status).to.equal(400);
    });

    it("returns error message", () => {
      expect(data.body.success).to.equal(false);
      expect(data.body.message).to.equal("completeOrder request not completed");
    });
  });


  describe("PUT /orders - invalid request parameter error", () => {
    const data = {};
    before(done => {
      request.put(
        `${baseURL}/order/0`,
        {
          json: {
            completd: true
          }
        },
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = body;
          done();
        }
      );
    });
    it("returns status code 400", () => {
      expect(data.status).to.equal(400);
    });

    it("returns error message", () => {
      expect(data.body.success).to.equal(false);
      expect(data.body.message).to.equal("invalid request parameter");
    });
  });

  describe("PUT /orders - error trying to completed undefined order state", () => {
    const data = {};
    before(done => {
      request.put(
        `${baseURL}/order/0`,
        {
          json: {
            completed: true
          }
        },
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = body;
          done();
        }
      );
    });
    it("returns status code 400", () => {
      expect(data.status).to.equal(400);
    });

    it("returns error message", () => {
      expect(data.body.success).to.equal(false);
      expect(data.body.message).to.equal("completeOrder request not completed");
    });
  });

  describe("PUT /orders - error trying to change order state of completed order", () => {
    const data = {};
    before(done => {
      request.put(
        `${baseURL}/order/1`,
        {
          json: {
            orderStatus: "accepted",
            completed: true
          }
        },
        () => {
          request.put(
            `${baseURL}/order/1`,
            {
              json: {
                orderStatus: "rejected"
              }
            },
            (error, response, body) => {
              data.status = response.statusCode;
              data.body = body;
              done();
            }
          );
        }
      );
    });
    it("returns status code 400", () => {
      expect(data.status).to.equal(400);
    });

    it("returns error message", () => {
      expect(data.body.success).to.equal(false);
      expect(data.body.message).to.equal("Order already completed");
    });
  });
  */
});
