
import { List, Paper, useTheme } from '@mui/material';
import { FC, useMemo, useContext, DragEvent } from 'react';
import {  Status } from '../../interfaces';
import { EntryCard } from './EntryCard';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';
import styles from './EntryList.module.css';

interface Props{
    status:Status
}


export const EntryList:FC<Props> = ({status}) => {

    const theme= useTheme().palette.mode;

    let {entries, updateEntry}=useContext(EntriesContext);
    let {isDragging, setIsNotDragging}=useContext(UIContext);

    const onDrop=(event:DragEvent<HTMLDivElement>)=>{
      const id = event.dataTransfer.getData('id');
      const entry = entries.find(e=>id === e._id )!;
      updateEntry({...entry, status:status}, false);  
      setIsNotDragging();
    }

    const entriesByStatus= useMemo(() => entries.filter(e =>status === e.status), [entries]);
    
    const allowDrop=(event:DragEvent<HTMLDivElement>)=>event.preventDefault();

    

  return (
//   DROP HERE
    <div
        onDrop={ onDrop }
        onDragOver={ allowDrop }
        className={isDragging ? (theme === 'dark' ? styles.draggingDark : styles.draggingLight  ): ''}
    >
        <Paper sx={{height:'100vh', overflow:'hidden', backgroundColor:'transparent'}}>
            {/* Change in drag */}
            <List sx={{opacity: isDragging ? 0.2 : 1, transition:'0.5s all'}}>
                {
                    entriesByStatus.map(e=> <EntryCard Entry={e} key={e._id}/>)
                }
            </List>
        </Paper>
    </div>
  )
}
