import { createContext } from 'react';

import { ICartProduct } from '@/interfaces';
import { ShippingAddress } from '@/context';

type ContextProps = {
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;

  shippingAddress?: ShippingAddress;

  // Methods
  addProductToCart: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
  removeCartProduct: (product: ICartProduct) => void;
  updateShippingAddress: (address: ShippingAddress) => void;
}

export const CartContext = createContext({} as ContextProps);