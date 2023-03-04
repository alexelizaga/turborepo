import { ICartProduct } from "@/interfaces";
import { CartState } from "./";

type CartActionType =
  | { type: '[CART] - Load cart from cookie | storage', payload: ICartProduct[] }
  | { type: '[CART] - Add product', payload: ICartProduct };

export const cartReducer = (state: CartState, action: CartActionType): CartState => {
  if (action.type === "[CART] - Load cart from cookie | storage") {
    return {
      ...state
    };
  } else {
    return state;
  }
};
