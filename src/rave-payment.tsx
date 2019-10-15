import React, {forwardRef, useContext} from 'react';
import RavePaymentProvider from './rave-provider';
import {RaveProviderProps} from './types';
import RavePaymentContent from './rave-context';

function RavePayment({
  children,
  ref,
}: {
  children: JSX.Element;
  ref: any;
}): React.FunctionComponentElement<any> {
  const {initializePayment, onClose, onSuccess} = useContext(RavePaymentContent);
  return React.cloneElement(children, {
    initializePayment,
    onClose,
    onSuccess,
    ref,
  });
}

export default forwardRef(
  (
    {children, ...props}: Omit<RaveProviderProps, 'children'> & {children: JSX.Element},
    ref: any,
  ) => (
    <RavePaymentProvider {...props}>
      <RavePayment ref={ref}>{children}</RavePayment>
    </RavePaymentProvider>
  ),
);
