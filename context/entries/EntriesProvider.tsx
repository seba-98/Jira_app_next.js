import { FC, useEffect, useReducer } from 'react'
import { EntriesContext } from './EntriesContext';
import { entriesReducer } from './EntriesReducer';
import { entriesApi } from '../../apis';
import { Entry, ISeedEntry } from '../../interfaces';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';

interface Props{
    children: JSX.Element
}


export interface EntryState{
   entries:Entry[] | []
}
const INITIAL_STATE: EntryState={
    entries:[]
}

export const EntriesProvider:FC<Props> = ({children}) => {
   const [state, dispatch] = useReducer(entriesReducer, INITIAL_STATE);
   const { enqueueSnackbar } = useSnackbar();
   const router= useRouter();


   const addNewEntry=async(entry:ISeedEntry)=>{
       try{
           const {data}= await entriesApi.post<Entry>('/entries', entry);
           dispatch({
               type:'[Entry] add-entry',
               payload:data
            })
           enqueueSnackbar('Entrada creada', {
               variant:'success', 
               preventDuplicate: true,
               autoHideDuration:1500,
               anchorOrigin:{
                   vertical:'top',
                   horizontal:'right'
               }
            });
       }
       catch(error:any){
            enqueueSnackbar(`${error.response.data.message!}`, {
                variant:'error', 
                preventDuplicate: true,
                autoHideDuration:1500,
                anchorOrigin:{
                    vertical:'top',
                    horizontal:'right'
                }
        });
       }
   }

   const updateEntry=async({description, status, _id}:Entry, showSnackBar=false)=>{
        try {
            const {data}= await entriesApi.put<Entry>(`/entries/${_id}`, {description:description, status:status})
            
            dispatch({
                 type:'[Entry] update-entry',
                 payload:data
            })

            showSnackBar &&
            enqueueSnackbar('Entrada actualizada', {
                variant:'success', 
                preventDuplicate: true,
                autoHideDuration:1500,
                anchorOrigin:{
                    vertical:'top',
                    horizontal:'right'
                }
            });
            
        } catch (error:any) {
            enqueueSnackbar(`${error.response.data.message!}`, {
                variant:'error', 
                preventDuplicate: true,
                autoHideDuration:1500,
                anchorOrigin:{
                    vertical:'top',
                    horizontal:'right'
                }
            });
        }
    }
    const deleteEntry=async(id:string)=>{
        try {
            await entriesApi.delete(`/entries/${id}`);
            enqueueSnackbar('Entrada eliminada', {
                variant:'success',
                autoHideDuration:1500,
                anchorOrigin:{
                    vertical:'top',
                    horizontal:'right'
                }
            });
            dispatch({
                type:'[Entry] delete-entry',
                payload:id
            })
            router.push('/');
        } catch (error:any) {
            enqueueSnackbar(`${error.response.data.message!}`, {
                variant:'error', 
                preventDuplicate: true,
                autoHideDuration:1500,
                anchorOrigin:{
                    vertical:'top',
                    horizontal:'right'
                }
            });
        }
   }



   const refreshEntries=async()=>{
       const {data}= await entriesApi.get<Entry[]>('/entries');
       dispatch({type:'[Entry] refresh-entry', payload:data })
   }
   

   useEffect(() => {
     refreshEntries();
   }, [])
   


  return (
        <EntriesContext.Provider value={{      // must be import the context
            ...state,
            addNewEntry,
            updateEntry,
            deleteEntry
        }}
        >
            {children}
        </EntriesContext.Provider>
    )
    }