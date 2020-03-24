import React, {ReactNode, useContext} from 'react';
import RavePaymentContent from './rave-context';

interface RavePaymentButtonProps {
  text?: string;
  className?: string;
  children?: ReactNode;
}

export default function RavePaymentButton({
  className,
  text,
  children,
  ...rest
}: RavePaymentButtonProps): JSX.Element {
  const {initializePayment, onClose, onSuccess} = useContext(RavePaymentContent);
  function handleClick(): void {
    return initializePayment(onSuccess, onClose);
  }
  return (
    <button onClick={handleClick} className={className} {...rest}>
      {text || children}
    </button>
  );
}
