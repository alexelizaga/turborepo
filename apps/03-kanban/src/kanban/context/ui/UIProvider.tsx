import { FC, useReducer } from "react";

import { UIContext, uiReducer } from './';

export type UIState = {
  isAddingEntry: boolean;
  isDraggingEntry: boolean;
  isModalOpen: boolean;
  isSidebarOpen: boolean;
}

const UI_INITIAL_STATE: UIState = {
  isAddingEntry: false,
  isDraggingEntry: false,
  isModalOpen: false,
  isSidebarOpen: false
}

type UIProviderProps = {
  children: React.ReactNode;
}

export const UIProvider: FC<UIProviderProps> = ({ children }) => {

  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const setIsSidebarOpen = (isOpen: boolean) => {
    dispatch({ type: '[UI] - Set isSidebarOpen', payload: isOpen })
  }

  const setIsModalOpen = (isOpen: boolean) => {
    dispatch({ type: '[UI] - Set isModalOpen', payload: isOpen })
  }

  const setIsAddingEntry = (isAdding: boolean) => {
    dispatch({ type: '[UI] - Set isAddingEntry', payload: isAdding })
  }

  const setIsDraggingEntry = (isDragging: boolean) => {
    dispatch({ type: '[UI] - Set isDraggingEntry', payload: isDragging })
  }

  return (
    <UIContext.Provider value={{
      ...state,
      setIsAddingEntry,
      setIsDraggingEntry,
      setIsModalOpen,
      setIsSidebarOpen
    }}>
      { children }
    </UIContext.Provider>
  )
}
