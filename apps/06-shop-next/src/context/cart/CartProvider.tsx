import { ICartProduct } from "@/interfaces";
import { FC, useMemo, useReducer } from "react";
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

  const providerValue = useMemo(
    () => ({
      ...state,
      // Methods
    }),
    [state]
  );

  return (
    <CartContext.Provider value={providerValue}>{children}</CartContext.Provider>
  );
};
