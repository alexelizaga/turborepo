import { createContext } from "react";

type ContextProps = {
  isAddingEntry: boolean;
  isDraggingEntry: boolean;
  sidemenuOpen: boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;
  setIsAddingEntry: (isAdding: boolean) => void;
  setIsDraggingEntry: (isDragging: boolean) => void;
}

export const UIContext = createContext({} as ContextProps);