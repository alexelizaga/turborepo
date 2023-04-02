import { IShippingAddress, IUser } from '@/interfaces';

export interface IOrder {
  _id?           : string;
  user?          : IUser | string;
  orderItems     : IOrderItem[];
  shippingAddress: IShippingAddress;
  paymentResult? : string;

  numberOfItems: number;
  subTotal     : number;
  total        : number;
  tax          : number;

  isPaid : boolean;
  paidAt?: string;
}

export interface IOrderItem {
  _id     : string;
  title   : string;
  size    : string;
  quantity: number;
  slug    : string;
  image   : string;
  price   : number;
}