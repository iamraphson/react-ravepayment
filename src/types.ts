type Currency =
  | 'NGN'
  | 'USD'
  | 'GHS'
  | 'KES'
  | 'UGX'
  | 'ZMW'
  | 'RWF'
  | 'XAF'
  | 'XOF'
  | 'ZAR'
  | 'TZS';
type Country = 'NG' | 'GH' | 'KE' | 'ZA' | 'TX' | string;
export type PaymentOptions =
  | 'card'
  | 'account'
  | 'ussd'
  | 'qr'
  | 'mpesa'
  | 'mobilemoneyghana'
  | 'mobilemoneyuganda'
  | 'mobilemoneyrwanda'
  | 'mobilemoneyzambia'
  | 'mobilemoneytanzania'
  | 'barter'
  | 'bank transfer';

type SubAccount = {id: string} & Record<string, string>;

export interface RaveProps {
  txref: string;
  customer_email: string;
  customer_phone: string;
  amount: number;
  PBFPubKey: string;
  pay_button_text?: string;
  integrity_hash?: string;
  currency?: Currency;
  country?: Country;
  custom_title?: string;
  custom_description?: string;
  custom_logo?: string;
  redirect_url?: string;
  production?: boolean;
  meta?: Record<string, string>[];
  customer_firstname?: string;
  customer_lastname?: string;
  payment_options?: PaymentOptions | PaymentOptions[];
  subaccounts?: SubAccount[];
  payment_plan?: number;
  hosted_payment?: number;
  campaign_id?: string;
}

export interface RaveProviderProps extends RaveProps {
  onSuccess: Function;
  onClose: Function;
  children: React.ReactNode | React.ReactNode[] | null;
}
