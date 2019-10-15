import React from 'react';

interface RaveContent {
  initializePayment: (onSuccess: Function, onClose: Function) => void;
  onClose: Function;
  onSuccess: Function;
}

const RavePaymentContent = React.createContext<RaveContent>({
  initializePayment: () => {},
  onClose: () => {},
  onSuccess: () => {},
});

export default RavePaymentContent;
