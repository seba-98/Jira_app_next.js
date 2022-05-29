import { UIState } from './UiProvider';

type UiType =
| {type:'ui-open-sidebar'}
| {type:'ui-close-sidebar'}
| {type:'ui-set-isAddingEntry'}
| {type:'ui-set-isNotAddingEntry'}
| {type:'ui-set-isDragging'}
| {type:'ui-set-isNotDragging'}


export const uiReducer=(state:UIState, action:UiType):UIState=>{

    switch (action.type) {

        case 'ui-open-sidebar':
            return {
                ...state,
                sideMenuOpen:true
            }
        case 'ui-close-sidebar':
            return {
                ...state,
                sideMenuOpen:false
            }
        case 'ui-set-isAddingEntry':
            return {
                ...state,
                isAddingEntry:true
            }
        case 'ui-set-isNotAddingEntry':
            return {
                ...state,
                isAddingEntry:false
            }
            
        case 'ui-set-isDragging':
            return {
                ...state,
                isDragging:true
            }
        case 'ui-set-isNotDragging':
            return {
                ...state,
                isDragging:false
            }

        default:
         return state
    }

}