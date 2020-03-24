import React from 'react';

interface RaveContext {
  initializePayment: (onSuccess: Function, onClose: Function) => void;
  onClose: Function;
  onSuccess: Function;
}

const RavePaymentContext = React.createContext<RaveContext>({
  initializePayment: () => {},
  onClose: () => {},
  onSuccess: () => {},
});

export default RavePaymentContext;
