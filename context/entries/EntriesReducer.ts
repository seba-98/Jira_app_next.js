import { Entry } from '../../interfaces/entry';
import { EntryState } from './';


type EntriesActionType=
| {type:'[Entry] add-entry', payload:Entry}
| {type:'[Entry] delete-entry', payload:string}
| {type:'[Entry] update-entry', payload:Entry}
| {type:'[Entry] refresh-entry', payload:Entry[]}



export const entriesReducer=(state:EntryState, action:EntriesActionType):EntryState=>{

    switch (action.type) {
      case '[Entry] add-entry':
          return {...state, entries:[...state.entries, action.payload]}
          
      case '[Entry] update-entry':
        const updatedEntries:Entry[]=state.entries.map((e)=>e._id === action.payload._id ? action.payload : e);
         return {...state, entries:updatedEntries}

      case '[Entry] refresh-entry':
         return {...state, entries:action.payload}

      case '[Entry] delete-entry':
         return {...state, entries:state.entries.filter(entry=>entry._id !== action.payload)}

        default:
            return state;
    }

}