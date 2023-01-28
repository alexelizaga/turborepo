import { createContext } from "react";

type ContextProps = {
  isAddingEntry: boolean;
  sidemenuOpen: boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;
  setIsAddingEntry: (isAdding: boolean) => void;
}

export const UIContext = createContext({} as ContextProps);