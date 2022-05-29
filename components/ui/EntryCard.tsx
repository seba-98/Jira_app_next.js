import { Card, CardActionArea, Typography, CardContent, CardActions } from '@mui/material'
import React, { FC, DragEvent, useContext } from 'react'
import { Entry } from '../../interfaces'
import { UIContext } from '../../context/ui/UiContext';
import { useRouter } from 'next/router';
import { dateFunctions } from '../../utils';

interface Props{
    Entry: Entry
}



export const EntryCard:FC<Props> = ({Entry}) => {

    const {setIsDragging}= useContext(UIContext);

    const router= useRouter();

    const onDragStart=(event:DragEvent<HTMLDivElement>)=>{
        event.dataTransfer.setData('id', Entry._id)
        setIsDragging();
    }
    const onEntry=()=> router.push(`/entries/${Entry._id}`);

  return (
      <Card
        sx={{marginBottom:1, margin:'12px'}}
        draggable
        onDragStart={onDragStart}
        onClick={onEntry}
       
      >
          <CardActionArea>
              <CardContent>
                  <Typography sx={{witheSpace: 'pre-line'}}>
                      {Entry.description}
                  </Typography>

                  <CardActions sx={{display:'flex', justifyContent:'end'}}>
                      <Typography variant='body2'>
                          {dateFunctions.getFormatDistance(Entry.createAt)}
                      </Typography>
                  </CardActions>
              </CardContent>
          </CardActionArea>
      </Card>
  )
}
