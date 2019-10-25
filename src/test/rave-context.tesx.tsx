import React from 'react';
// @ts-ignore
import {renderHook, cleanup, act} from '@testing-library/react-hooks';
import {render, fireEvent} from '@testing-library/react';
import useRaveScript from '../use-rave-script';
import RavePaymentContent from '../rave-context';
import RavePaymentButton from '../rave-payment-button';
import useRavePayment from '../use-rave-payment';

const config = {
  txref: 'rave-123456',
  customer_email: 'user@example.com',
  customer_phone: '234099940409',
  amount: 2000,
  PBFPubKey: 'FLWPUBK-24b72aebb821aea177483039677df9d3-X',
};

describe('<RaveContext />', () => {
  beforeEach(() => {
    // @ts-ignore
    global.getpaidSetup = jest.fn();
    cleanup();
    document.body.innerHTML = '';
    renderHook(() => useRaveScript(false)); // setup loading for scripts
  });

  it('render-correctly', () => {
    const {result, rerender} = renderHook(() => useRavePayment(config));
    rerender();
    const tree = (
      <RavePaymentContent.Provider
        value={{
          initializePayment: result.current.initializePayment,
          onClose: (): void => {},
          onSuccess: (): void => {},
        }}
      >
        <RavePaymentButton>Click</RavePaymentButton>
      </RavePaymentContent.Provider>
    );
    const {getByText} = render(tree);
    // Click button
    fireEvent.click(getByText('Click'));
    // @ts-ignore
    expect(global.getpaidSetup).toHaveBeenCalledTimes(1);
  });
});
