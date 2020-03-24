import {useEffect} from 'react';
import {RaveProps} from './types';
import useRaveScript from './use-rave-script';
import {constructPaymentOption} from './utils';

export default function useRavePayment(
  options: RaveProps,
): {initializePayment: (onSuccess?: Function, onClose?: Function) => void} {
  const {
    customer_email,
    customer_phone,
    amount,
    txref,
    PBFPubKey,
    meta = [{}],
    pay_button_text = '',
    integrity_hash = '',
    currency = 'NGN',
    country = 'NG',
    customer_firstname = '',
    customer_lastname = '',
    production = false,
    custom_title = '',
    custom_description = '',
    custom_logo = '',
    redirect_url = '',
    payment_options,
    subaccounts = [{}],
    payment_plan = '',
    hosted_payment = '',
    campaign_id = '',
  } = options;
  const [scriptLoaded, scriptError] = useRaveScript(production);

  function initializePayment(onSuccess?: Function, onClose?: Function): void {
    if (scriptError) {
      throw new Error('Unable to load flutterwave script');
    }
    if (scriptLoaded) {
      const raveOption = {
        customer_email,
        customer_phone,
        amount,
        txref,
        PBFPubKey,
        meta,
        pay_button_text,
        integrity_hash,
        currency,
        country,
        customer_firstname,
        customer_lastname,
        custom_title,
        custom_description,
        custom_logo,
        redirect_url,
        payment_options: constructPaymentOption(payment_options),
        subaccounts,
        payment_plan,
        hosted_payment,
        campaign_id,
        onclose: onClose ? onClose : (): void => {},
        callback: onSuccess ? onSuccess : (): void => {},
      };
      // @ts-ignore
      window.getpaidSetup(raveOption);
    }
  }

  useEffect(() => {
    if (scriptError) {
      throw new Error('Unable to load flutterwave script');
    }
  }, [scriptError]);
  return {initializePayment};
}
