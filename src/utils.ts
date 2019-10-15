import {PaymentOptions} from './types';

export function constructPaymentOption(option?: PaymentOptions | PaymentOptions[]): string {
  if (!option) return 'both';
  if (Array.isArray(option)) return option.join(',');
  return option as string;
}
