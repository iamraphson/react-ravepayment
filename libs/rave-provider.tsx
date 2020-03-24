import React from 'react';
import {RaveProviderProps} from './types';
import RavePaymentContext from './rave-context';
import {useRavePayment} from '.';

export default function RavePaymentProvider(props: RaveProviderProps): JSX.Element {
  const {children, onClose, onSuccess, ...others} = props;
  const {initializePayment} = useRavePayment(others);
  return (
    <RavePaymentContext.Provider value={{initializePayment, onClose, onSuccess}}>
      {children}
    </RavePaymentContext.Provider>
  );
}
