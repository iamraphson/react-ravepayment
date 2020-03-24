import React from 'react';
// @ts-ignore
import {renderHook, cleanup, act} from '@testing-library/react-hooks';
import {render, fireEvent} from '@testing-library/react';
import RavePayment from '../rave-payment';
import useRaveScript from '../use-rave-script';
import {config} from './shared';

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
