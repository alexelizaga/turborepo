import { createContext } from "react";

type ContextProps = {
  isAddingEntry: boolean;

  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;

  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;

  isDraggingEntry: boolean;
  setIsAddingEntry: (isAdding: boolean) => void;
  setIsDraggingEntry: (isDragging: boolean) => void;
}

export const UIContext = createContext({} as ContextProps);