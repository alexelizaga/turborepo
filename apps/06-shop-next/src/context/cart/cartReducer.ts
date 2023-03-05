import { ICartProduct } from "@/interfaces";
import { CartState } from "./";

type CartActionType =
  | { type: '[CART] - Load cart from cookie | storage', payload: ICartProduct[] }
  | { type: '[CART] - Update products in cart', payload: ICartProduct[] };

export const cartReducer = (state: CartState, action: CartActionType): CartState => {
  switch (action.type) {
    case '[CART] - Load cart from cookie | storage':
      return {
        ...state,
        cart: [...action.payload]
      };

    case '[CART] - Update products in cart':
      return {
        ...state,
        cart:  [...action.payload ]
      };
  
    default:
      return state;
  }
};
