import { UIState } from './';

type UIActionType =
| { type: '[UI] - Set isModalOpen', payload: boolean }
| { type: '[UI] - Set isSidebarOpen', payload: boolean }
| { type: '[UI] - Set isAddingEntry', payload: boolean }
| { type: '[UI] - Set isDraggingEntry', payload: boolean }

export const uiReducer = ( state: UIState, action: UIActionType ): UIState => {
  switch (action.type) {
    case '[UI] - Set isModalOpen':
      return {
        ...state,
        isModalOpen: action.payload
      }
    case '[UI] - Set isSidebarOpen':
      return {
        ...state,
        isSidebarOpen: action.payload
      }
    case '[UI] - Set isAddingEntry':
      return {
        ...state,
        isAddingEntry: action.payload
      }
    case '[UI] - Set isDraggingEntry':
      return {
        ...state,
        isDraggingEntry: action.payload
      }
  
    default:
      return state;
  }
};