import { createContext } from 'react';
import { Entry, ISeedEntry } from '../../interfaces';


interface ContextProps{
    entries:Entry[],
    addNewEntry:(entry:ISeedEntry)=>void,
    updateEntry:(entry:Entry, showSnackBar:boolean)=>void,
    deleteEntry:(id:string)=>void
}

export const EntriesContext= createContext({}  as ContextProps);