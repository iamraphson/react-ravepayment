import * as React from "react";

interface IState {
  scriptLoaded: any;
  text: string;
  class: string;
  currency: string;
  country: string;
}

interface IProps {
  reference: string;
  text: string;
  email: string;
  amount: number;
  ravePubKey: string;
  callback: () => any;
  close: () => any;
  subaccounts?: string[];
  payment_options?: string;
  redirect_url?: string;
  payment_plan?: number;
  hosted_payment?: number;
  campaign_id?: string;
  metadata?: Record<string, string>,
  currency?: string;
  country?: string;
  customer_firstname?: string;
  customer_lastname?: string;
  customer_phone?: string;
  custom_title?: string;
  custom_description?: string;
  custom_logo?: string;
  isProduction?: boolean;
  tag?: 'button' | 'a' | 'input';
  class?: string;
}


declare class RavePayment extends React.Component<IProps, IState> {}

export default RavePayment;