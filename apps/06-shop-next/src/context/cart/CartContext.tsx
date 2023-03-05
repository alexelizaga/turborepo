import { createContext } from 'react';

import { ICartProduct } from '@/interfaces';

type ContextProps = {
  cart: ICartProduct[];

  // Methods
  addProductToCart: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);