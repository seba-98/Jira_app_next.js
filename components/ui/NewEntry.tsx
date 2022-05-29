import { Box, Button, TextField } from '@mui/material'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { ChangeEvent, useContext, useState } from 'react';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from '../../context/ui/UiContext';

export const NewEntry = () => {


    const {addNewEntry}=useContext(EntriesContext);
    const { isAddingEntry, setIsAddingEntry, setIsNotAddingEntry}=useContext(UIContext);

    const [touched, setTouched] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const onTouch=()=>setTouched(true);
    const outTouch=()=>setTouched(false);

    const onChangeValue=({target}:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>setInputValue(target.value);

    const addEntry=()=>{
        if(inputValue.length < 4)return;
        addNewEntry({
            description:inputValue,
            createAt: Date.now(),
            status: 'pending'
        })
        setInputValue('');
        onTouch();
        setIsNotAddingEntry();
    }

  return (
    <Box sx={{ marginBottom:2, paddingX:3 }}>

        {
            isAddingEntry ? (<>
                <TextField 
                    fullWidth
                    sx={{marginTop:2, marginBottom:1 }}
                    multiline
                    label='Nueva entrada'
                    helperText={touched && inputValue.length < 4 && 'Ingrese 4 o mas carácteres'}
                    error={touched && inputValue.length < 4}
                    value={inputValue}
                    onChange={onChangeValue}
                    onFocus={onTouch}
                    onBlur={outTouch}
                />
                <Box display='flex' justifyContent='space-between'>
                    <Button variant='outlined' onClick={setIsNotAddingEntry}> Cancelar </Button>
                    <Button  variant='outlined' color='secondary' endIcon={<SaveOutlinedIcon />} onClick={addEntry}>
                        Guardar
                    </Button>
                </Box>
            </>)

            :

           (
                <Button  
                    variant='outlined' 
                    startIcon={<AddCircleOutlineOutlinedIcon />}
                    fullWidth
                    onClick={setIsAddingEntry}
                    >
                    Añadir entrada
                </Button>
            )

        }

    </Box>

  )
}