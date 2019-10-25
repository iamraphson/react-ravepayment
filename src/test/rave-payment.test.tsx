import React from 'react';
// @ts-ignore
import {renderHook, cleanup, act} from '@testing-library/react-hooks';
import {render, fireEvent} from '@testing-library/react';
import RavePayment from '../rave-payment';
import useRaveScript from '../use-rave-script';

const config = {
  txref: 'rave-123456',
  customer_email: 'user@example.com',
  customer_phone: '234099940409',
  amount: 2000,
  PBFPubKey: 'FLWPUBK-24b72aebb821aea177483039677df9d3-X',
};

describe('<RavePayment />', () => {
  beforeEach(() => {
    // @ts-ignore
    global.getpaidSetup = jest.fn();
    cleanup();
    document.body.innerHTML = '';
    renderHook(() => useRaveScript(false)); // setup loading for scripts
  });

  it('render-correctly', () => {
    const Btn = (): any => (
      <RavePayment {...config} onClose={(): void => {}} onSuccess={(): void => {}}>
        {({initializePayment}): any => (
          <button onClick={(): any => initializePayment()}>Click</button>
        )}
      </RavePayment>
    );
    const {getByText} = render(<Btn />);
    // Click button
    fireEvent.click(getByText('Click'));
    // @ts-ignore
    expect(global.getpaidSetup).toHaveBeenCalledTimes(1);
  });
});
