import React, { ChangeEvent, FC, useContext, useMemo, useState } from 'react'
import { GetServerSideProps } from 'next'
import { Status } from '../../interfaces/entry';
import { Layout } from '../../components/layouts/Layout';
import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton, useTheme } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {dbEntries} from '../../database';
import { IEntry } from '../../models/Entry';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { dateFunctions } from '../../utils';

const validStatus:Status[]=['pending', 'in-progress', 'finished'];
interface Props{
    entry: IEntry
}


const EntryPage:FC<Props> = (props) => {

    
    const {_id, status, createAt, description } = props.entry;
    const {updateEntry, deleteEntry}= useContext(EntriesContext);

    const [inputValue, setInputValue] = useState(description);
    const [statusValue, setStatus] = useState<Status>(status);
    const [touch, setTouch] = useState(false);

    const onChangeInput=({target}:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        setInputValue(target.value);
    }

    const onChangeStatus=({target}:ChangeEvent<HTMLInputElement>)=>{
        const value=target.value; 
        setStatus( value as Status );
    }

    const validate= useMemo(() => inputValue.trim().length < 4 ? true : false, [inputValue.length])


    const onSave=()=>{
        if(validate) return; 

        const updated={
            ...props.entry,
            status:statusValue as Status,
            description:inputValue,
        }
        updateEntry(updated, true);
    }
    
    const onDelete=()=>deleteEntry(_id)
    const onTouch=()=>setTouch(true)
    const onBlur=()=>setTouch(false)


    
  return (
    <Layout title={`${inputValue.substring(0,10)}...`}>

        <>
            <Grid
                container
                justifyContent='center'
                sx={{marginTop:2}}
            >
                <Grid item xs={ 12 } sm={ 8 } md={ 6 } >
                    <Card>
                        <CardHeader title={`${inputValue.substring(0,10)}...`} subheader={`Creada hace: ${dateFunctions.getFormatDistance(createAt)}`} />
                        <CardContent>
                            <TextField 
                                fullWidth
                                sx={{marginTop:2, marginBottom:1 }}
                                placeholder="Entrada"
                                autoFocus
                                multiline
                                label="Actualizar entrada"   
                                onChange={onChangeInput}
                                value={inputValue}
                                onFocus={onTouch}
                                onBlur={onBlur}
                                helperText={validate && touch && 'Ingrese 4 o mas carácteres'}
                                error={touch && validate}
                            />
                            
                            <FormControl>
                                <FormLabel>Estado:</FormLabel>
                                <RadioGroup row onChange={onChangeStatus} value={statusValue}>
                                    {
                                    validStatus.map(option => <FormControlLabel 
                                        key={option}
                                        value={option}
                                        control={<Radio />}
                                        label={capitalize(option)}
                                        /> ) 
                                    }
                                </RadioGroup>
                            </FormControl>
                        </CardContent>
                        <CardActions>
                            <Button 
                                variant='contained'
                                startIcon={<UpdateIcon/>}
                                fullWidth
                                onClick={onSave}  
                                disabled={ validate }
                            >Save</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>

            <IconButton sx={{
                position:'fixed',
                bottom:30,
                right:30,
                backgroundColor:'error.main',
            }}
            onClick={onDelete}
            >
            <DeleteForeverIcon sx={{width:'60px', height:'60px'}}/>                      
            </IconButton>
        </>

    </Layout>
  )
}



export const getServerSideProps: GetServerSideProps = async ({params}) => {

    const {id}= params as {id:string};
    const entry= await dbEntries.getEntryById(id);
    

    if(!entry){
        return{
            redirect:{
                destination:'/',
                permanent:false
            }
        }
    }
    
    return {
        props: {
           entry
        }
    }
}

export default EntryPage