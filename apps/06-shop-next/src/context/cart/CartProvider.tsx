import { FC, useEffect, useMemo, useReducer } from "react";
import cookies from 'js-cookie';

import { ICartProduct } from "@/interfaces";

import { CartContext, cartReducer } from "./";

export interface CartState {
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0
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

  useEffect(() => {
    const numberOfItems = state.cart.reduce((prev, current) => current.quantity + prev , 0);
    const subTotal = state.cart.reduce((prev, current) => current.price * current.quantity + prev, 0);
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

  
    const orderSummary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal * (taxRate + 1)
    }

    dispatch({ type: '[CART] - Update order summary', payload: orderSummary });
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

  const removeCartProduct = (product: ICartProduct) => {
    dispatch({
      type: '[CART] - Remove product in cart',
      payload: product
    })
  }

  const providerValue = useMemo(
    () => ({
      ...state,
      // Methods
      addProductToCart,
      removeCartProduct,
      updateCartQuantity
    }),
    [state]
  );

  return (
    <CartContext.Provider value={providerValue}>{children}</CartContext.Provider>
  );
};
