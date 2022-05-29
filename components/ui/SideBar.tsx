import React, { useContext } from 'react'
import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { UIContext } from '../../context/ui/UiContext';


export const SideBar = () => {

    const { sideMenuOpen, closeSideMenu, turnTheme }=useContext(UIContext);
    
    const theme= useTheme().palette.mode;

    const changeTheme=()=>turnTheme.setTheme(!turnTheme.theme)


  return (
    <Drawer
        anchor='left'
        open={sideMenuOpen}
        onClose={closeSideMenu}
    >
        <Box sx={{padding:'5px 10px'}}>
            <Typography variant='h4'>Menú</Typography>
        </Box>
        <Box sx={{width:250}}>
            <List>
                <ListItem button onClick={changeTheme}>
                    <ListItemIcon>
                       <DarkModeIcon />
                    </ListItemIcon>
                    <ListItemText  primary={theme === 'dark' ? 'LightMode' : 'DarkMode'}/>
                </ListItem>     
            </List>
        </Box>
        <Divider />
    </Drawer>
  )
}
