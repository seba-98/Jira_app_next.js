import { createContext } from "react";
import { IChangeTheme } from "../../interfaces";

interface ContextProps{
    sideMenuOpen:boolean,
    isAddingEntry:boolean,
    isDragging:boolean,
    setIsAddingEntry:()=>void,
    setIsNotAddingEntry:()=>void,
    openSideMenu: ()=>void,
    closeSideMenu: ()=>void,
    setIsDragging:()=>void,
    setIsNotDragging:()=>void,
    turnTheme:IChangeTheme
}

export const UIContext= createContext({}  as ContextProps);


