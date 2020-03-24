import {constructPaymentOption} from '../utils';
describe('constructPaymentOption', () => {
  it('returns both when provided no arguments', () => {
    expect(constructPaymentOption()).toEqual('both');
  });
  it('returns the provided parameter', () => {
    expect(constructPaymentOption('ussd')).toEqual('ussd');
  });

  it('accepts multiple parameter as an array', () => {
    expect(constructPaymentOption(['account', 'bank transfer', 'barter'])).toEqual(
      'account,bank transfer,barter',
    );
  });
});
