import { FC, useReducer } from "react";

import { UIContext, uiReducer } from './';

export type UIState = {
  isAddingEntry: boolean;
  sidemenuOpen: boolean;
}

const UI_INITIAL_STATE: UIState = {
  isAddingEntry: false,
  sidemenuOpen: false
}

type UIProviderProps = {
  children: React.ReactNode;
}

export const UIProvider: FC<UIProviderProps> = ({ children }) => {

  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openSideMenu = () => {
    dispatch({ type: '[UI] - Open Sidebar' })
  }

  const closeSideMenu = () => {
    dispatch({ type: '[UI] - Close Sidebar' })
  }

  const setIsAddingEntry = (isAdding: boolean) => {
    dispatch({ type: '[UI] - Set isAddingEntry', payload: isAdding })
  }

  return (
    <UIContext.Provider value={{
      ...state,
      closeSideMenu,
      openSideMenu,
      setIsAddingEntry
    }}>
      { children }
    </UIContext.Provider>
  )
}
