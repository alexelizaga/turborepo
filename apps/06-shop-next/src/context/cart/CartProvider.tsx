import { FC, useEffect, useMemo, useReducer } from "react";
import cookies from 'js-cookie';

import { ICartProduct } from "@/interfaces";

import { CartContext, cartReducer } from "./";

export interface CartState {
  cart: ICartProduct[];
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
};

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const CartProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  useEffect(() => {
    try {
        const cookieProducts = cookies.get('cart') ? JSON.parse( cookies.get('cart')! ): []
        dispatch({ type: '[CART] - Load cart from cookie | storage', payload: cookieProducts });
    } catch (error) {
        dispatch({ type: '[CART] - Load cart from cookie | storage', payload: [] });
    }
  }, []);

  useEffect(() => {
    if (!!state.cart.length) {
      cookies.set('cart', JSON.stringify( state.cart ));
    }
  }, [state.cart]);
  

  const addProductToCart = (product: ICartProduct) => {
    const productInCart = state.cart.some((p) => p._id === product._id);
    if (!productInCart) {
      return dispatch({
        type: "[CART] - Update products in cart",
        payload: [...state.cart, product],
      });
    }
    const productInCartButDifferentSize = state.cart.some(
      (p) => p._id === product._id && p.size === product.size
    );
    if (!productInCartButDifferentSize) {
      return dispatch({
        type: "[CART] - Update products in cart",
        payload: [...state.cart, product],
      });
    }

    // Accumulate
    const updatedProducts = state.cart.map( p => {
      if (p._id !== product._id) return p;
      if (p.size !== product.size) return p;

      p.quantity += product.quantity;

      return p;
    });
    dispatch({ type: '[CART] - Update products in cart', payload: updatedProducts })
  }

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({
      type: '[CART] - Change product cart quantity',
      payload: product
    })
  }

  const providerValue = useMemo(
    () => ({
      ...state,
      // Methods
      addProductToCart,
      updateCartQuantity
    }),
    [state]
  );

  return (
    <CartContext.Provider value={providerValue}>{children}</CartContext.Provider>
  );
};
