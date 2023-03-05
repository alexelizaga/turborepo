import { ICartProduct } from "@/interfaces";
import { CartState } from "./";

type CartActionType =
  | { type: '[CART] - Load cart from cookie | storage', payload: ICartProduct[] }
  | { type: '[CART] - Update products in cart', payload: ICartProduct[] }
  | { type: '[CART] - Change product cart quantity', payload: ICartProduct }
  | { type: '[CART] - Remove product in cart', payload: ICartProduct };

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

    case '[CART] - Change product cart quantity':
      return {
        ...state,
        cart: state.cart.map(product => {
          if ( product._id !== action.payload._id ) return product;
          if ( product.size !== action.payload.size ) return product;          
          return action.payload;
        })
      }
    
    case '[CART] - Remove product in cart':
      return {
        ...state,
        cart: state.cart.filter(
          (product) => !(
            product._id === action.payload._id &&
            product.size === action.payload.size
          )
        ),
      };
  
    default:
      return state;
  }
};
