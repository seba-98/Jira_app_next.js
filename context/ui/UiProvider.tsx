import { FC, useReducer } from "react"
import { IChangeTheme } from "../../interfaces"
import { UIContext } from "./UiContext"
import { uiReducer } from "./UiReducer"

export interface UIState{
    sideMenuOpen:boolean,
    isAddingEntry:boolean,
    isDragging:boolean,
}


interface Props{
    children: JSX.Element,
    turnTheme:IChangeTheme
}


const UI_INITIAL_STATE: UIState={
    sideMenuOpen:false,
    isAddingEntry:false,
    isDragging:false
}



export const UiProvider:FC<Props> = ({children, turnTheme}) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

    const openSideMenu=():void=> dispatch( {type:'ui-open-sidebar'} );
    const closeSideMenu=():void=> dispatch( {type:'ui-close-sidebar'} );
    const setIsAddingEntry=():void=> dispatch( {type:'ui-set-isAddingEntry'} );
    const setIsNotAddingEntry=():void=> dispatch( {type:'ui-set-isNotAddingEntry'} );

    const setIsDragging=():void=> dispatch( {type:'ui-set-isDragging'} );
    const setIsNotDragging=():void=> dispatch( {type:'ui-set-isNotDragging'} );
        
    

  return (
    <UIContext.Provider value={{
        ...state, 
        openSideMenu, 
        closeSideMenu, 
        setIsAddingEntry,
        setIsNotAddingEntry,
        setIsDragging,
        setIsNotDragging,
        turnTheme
    }}>
        {children}
    </UIContext.Provider>
  )
}




