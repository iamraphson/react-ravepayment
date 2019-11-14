import React, {forwardRef, useContext} from 'react';
import RavePaymentProvider from './rave-provider';
import {RaveProviderProps} from './types';
import RavePaymentContent from './rave-context';

type PaymentChildren = (options: {
  initializePayment: Function;
  onClose: Function;
  onSuccess: Function;
  ref: any;
}) => JSX.Element;

function RavePayment({
  children,
  ref,
}: {
  children: PaymentChildren;
  ref: any;
}): React.FunctionComponentElement<any> {
  const {initializePayment, onClose, onSuccess} = useContext(RavePaymentContent);
  return children({
    initializePayment,
    onClose,
    onSuccess,
    ref,
  });
}

export default forwardRef(
  (
    {children, ...props}: Omit<RaveProviderProps, 'children'> & {children: PaymentChildren},
    ref: any,
  ) => (
    <RavePaymentProvider {...props}>
      <RavePayment ref={ref}>{children}</RavePayment>
    </RavePaymentProvider>
  ),
);
