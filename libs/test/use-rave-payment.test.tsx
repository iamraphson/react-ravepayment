import React from 'react';
// @ts-ignore
import {renderHook, cleanup, act} from '@testing-library/react-hooks';
import {render, fireEvent} from '@testing-library/react';

import useRavePayment from '../use-rave-payment';
import useRaveScript from '../use-rave-script';
import {config} from './shared';

describe('useRavePayment()', () => {
  beforeEach(() => {
    // @ts-ignore
    global.getpaidSetup = jest.fn();
    cleanup();
    document.body.innerHTML = '';
    renderHook(() => useRaveScript(false)); // setup loading for scripts
  });

  it('should use ravePayment', () => {
    const {result, rerender} = renderHook(() => useRavePayment(config));
    rerender();
    const onSuccess = jest.fn();
    const onClose = jest.fn();
    act(() => {
      result.current.initializePayment(onSuccess, onClose);
    });
    expect(onSuccess).toHaveBeenCalledTimes(0);
    expect(onClose).toHaveBeenCalledTimes(0);
    // @ts-ignore
    expect(global.getpaidSetup).toHaveBeenCalledTimes(1);
  });

  it('should use not require parameter for initializePayment', () => {
    const {result, rerender} = renderHook(() => useRavePayment(config));
    rerender();
    act(() => {
      result.current.initializePayment();
    });
    // @ts-ignore
    expect(global.getpaidSetup).toHaveBeenCalledTimes(1);
  });

  it('should use accept all parameters', () => {
    const {result, rerender} = renderHook(() =>
      useRavePayment({
        ...config,
        meta: [{name: 'foo'}],
        pay_button_text: 'Foo',
        integrity_hash: 'foo',
        currency: 'NGN',
        country: 'NG',
        customer_firstname: 'Foo',
        customer_lastname: 'Foo',
        production: false,
        custom_title: 'Title',
        custom_description: 'Foo',
        custom_logo: 'Foo',
        redirect_url: 'Foo',
        payment_options: ['account', 'bank transfer'],
        subaccounts: [{id: 'Foo '}],
        payment_plan: 0,
        hosted_payment: 0,
        campaign_id: 'Foo',
      }),
    );
    rerender();
    act(() => {
      result.current.initializePayment();
    });
    // @ts-ignore
    expect(global.getpaidSetup).toHaveBeenCalledTimes(1);
  });

  it('should accept being rendered in a container', () => {
    const wrapper: React.FC = ({ children }) => {
         return <div>{children}</div>;
    };

    const {result, rerender} = renderHook(() => useRavePayment(config), { wrapper });

    rerender();
    act(() => {
      result.current.initializePayment();
    });
    // @ts-ignore
    expect(global.getpaidSetup).toHaveBeenCalledTimes(1);
  });

  it('should be accept trigger from other component', () => {
    const {result, rerender} = renderHook(() => useRavePayment(config));
    rerender();
    const Btn = (): any => (
      <div>
        <button onClick={(): any => result.current.initializePayment()}>Click</button>
      </div>
    );
    const {getByText} = render(<Btn />);
    // Click button
    fireEvent.click(getByText('Click'));
    // @ts-ignore
    expect(global.getpaidSetup).toHaveBeenCalledTimes(1);
  });
});
