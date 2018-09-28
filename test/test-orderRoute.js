import request from 'request';
import { expect, assert } from 'chai';


describe('Api v1 Server', () => {
  const baseURL = 'http://localhost:3000/api/v1';

  describe('GET /orders', () => {
    const data = {};
    before((done) => {
      request.get(
        `${baseURL}/orders`,
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

    it('responds with json ', () => {
      assert(typeof (data.body), 'json');
    });
  });

  describe('POST /orders - form', () => {
    const data = {};
    before((done) => {
      request.post(`${baseURL}/orders`,
        {
          form: {

            customerName: 'test name2',
            customerAddress: 'test address2',
            foodOrdered: 'test-food2',
          },
        },
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = body;
          done();
        });
    });
    it('returns status code 201', () => {
      expect(data.status).to.equal(201);
    });
    it('returns json', () => {
      assert(typeof (data.body), 'json');
    });
  });

  describe('POST /orders - json', () => {
    const data = {};
    before((done) => {
      request.post(`${baseURL}/orders`,
        {
          json: {

            customerName: 'test name3',
            customerAddress: 'test address3',
            foodOrdered: 'test-food3',
          },
        },
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = body;
          done();
        });
    });
    it('returns status code 201', () => {
      expect(data.status).to.equal(201);
    });
    it('returns json', () => {
      assert(typeof (data.body), 'json');
    });
  });

  describe('POST /orders - bad json', () => {
    const data = {};
    before((done) => {
      request.post(`${baseURL}/orders`,
        {
          json: {

            customer: 'test name4',
            customerAddress: 'test address4',
            foodOrdered: 'test-food2',
          },
        },
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = body;
          done();
        });
    });
    it('returns status code 400', () => {
      expect(data.status).to.equal(400);
    });
    it('returns json', () => {
      assert(typeof (data.body), 'json');
    });
    it('returns error mesaage: invalid parameters', () => {
      expect(data.body.error).to.equal('invalid parameters');
    });
  });


  describe('GET /orders/0', () => {
    const data = {};
    before((done) => {
      request.get(
        `${baseURL}/order/0`,
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
    it('returns json', () => {
      assert(typeof (data.body), 'json');
    });
    it('returns orderId of 0', () => {
      const data2 = JSON.parse(data.body);
      expect(data2.orderId).to.equal(0);
    });
  });

  describe('GET /order/<orderId> - out of range', () => {
    const data = {};
    before((done) => {
      request.get(
        `${baseURL}/order/100000`,
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = body;
          done();
        },
      );
    });
    it('returns status code 400', () => {
      expect(data.status).to.equal(400);
    });
    it('returns json', () => {
      assert(typeof (data.body), 'json');
    });
    it('returns error message', () => {
      const data2 = JSON.parse(data.body);
      expect(data2.message).to.equal('no order with order id 100000');
    });
  });


  describe('PUT /orders - update status', () => {
    const data = {};
    before((done) => {
      request.post(`${baseURL}/orders`,
        {
          json: {

            customerName: 'test name4',
            customerAddress: 'test address4',
            foodOrdered: 'test-food2',
          },
        },
        (error, response, body) => {
          const { orderId } = body;
          request.put(
            `${baseURL}/order/${orderId}`,
            {
              json: {
                orderStatus: 'accepted',
              },
            },
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

    it('returns a json', () => {
      assert(typeof (data.body), 'json');
    });
    it('returns a json response', () => {
      assert(typeof (data.body), 'json');
    });
  });

  describe('PUT /orders - update completed-status', () => {
    const data = {};
    before((done) => {
      request.post(`${baseURL}/orders`,
        {
          json: {
            customerName: 'test name4',
            customerAddress: 'test address4',
            foodOrdered: 'test-food2',
          },
        },
        (error, response, body) => {
          const { orderId } = body;
          request.put(
            `${baseURL}/order/${orderId}`,
            {
              json: {
                completed: true,
                orderStatus: 'accepted',
              },
            },
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

    it('returns status a json', () => {
      assert(typeof (data.body), 'json');
    });
  });

  describe('PUT /orders - reject order with update status error', () => {
    const data = {};
    before((done) => {
      request.put(
        `${baseURL}/order/100`,
        {
          json: {
            orderStatus: 'rejected',
          },
        },
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = body;
          done();
        },
      );
    });
    it('returns status code 400', () => {
      expect(data.status).to.equal(400);
    });

    it('returns error message', () => {
      expect(data.body.message).to.equal('update orderStatus request not completed');
    });
  });

  describe('PUT /orders - reject order with update-completed error', () => {
    const data = {};
    before((done) => {
      request.put(
        `${baseURL}/order/100`,
        {
          json: {
            completed: true,
          },
        },
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = body;
          done();
        },
      );
    });
    it('returns status code 400', () => {
      expect(data.status).to.equal(400);
    });

    it('returns error message', () => {
      expect(data.body.success).to.equal(false);
      expect(data.body.message).to.equal('completeOrder request not completed');
    });
  });

  describe('PUT /orders - invalid request parameter error', () => {
    const data = {};
    before((done) => {
      request.put(
        `${baseURL}/order/0`,
        {
          json: {
            completd: true,
          },
        },
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = body;
          done();
        },
      );
    });
    it('returns status code 400', () => {
      expect(data.status).to.equal(400);
    });

    it('returns error message', () => {
      expect(data.body.success).to.equal(false);
      expect(data.body.message).to.equal('invalid request parameter');
    });
  });

  describe('PUT /orders - error trying to completed undefined order state', () => {
    const data = {};
    before((done) => {
      request.put(
        `${baseURL}/order/0`,
        {
          json: {
            completed: true,
          },
        },
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = body;
          done();
        },
      );
    });
    it('returns status code 400', () => {
      expect(data.status).to.equal(400);
    });

    it('returns error message', () => {
      expect(data.body.success).to.equal(false);
      expect(data.body.message).to.equal('completeOrder request not completed');
    });
  });

  describe('PUT /orders - error trying to change order stated of completed order', () => {
    const data = {};
    before((done) => {
      request.put(
        `${baseURL}/order/1`,
        {
          json: {
            orderStatus: 'accepted',
            completed: true,
          },
        },
        () => {
          request.put(
            `${baseURL}/order/1`,
            {
              json: {
                orderStatus: 'rejected',
              },
            },
            (error, response, body) => {
              data.status = response.statusCode;
              data.body = body;
              done();
            },
          );
        },
      );
    });
    it('returns status code 400', () => {
      expect(data.status).to.equal(400);
    });

    it('returns error message', () => {
      expect(data.body.success).to.equal(false);
      expect(data.body.message).to.equal('update orderStatus request not completed');
    });
  });
});
