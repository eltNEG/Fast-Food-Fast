import { expect } from 'chai';
import { Order } from '../models/orderModel';


describe('Test order model', () => {
  describe('initialise orderManager with no data', () => {
    let orderManager;
    before((done) => {
      orderManager = new Order();
      done();
    });
    it('has empty order', () => {
      expect(JSON.stringify(orderManager.orders)).to.equal(JSON.stringify({}));
    });

    it('has lastOrderId 0', () => {
      expect(orderManager.lastOrderId).to.equal(0);
    });
  });

  describe('try to call order class as function', () => {
    it('throws error', () => {
      try {
        const orderManager = Order();
        expect(typeof (orderManager)).to.equal('undefined');
      } catch (err) {
        expect(err.message).to.equal('Cannot call a class as a function');
        expect(typeof (orderManager)).to.equal('undefined');
      }
    });
  });
});
