import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export default function TemporaryDrawer(){
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

const Draerlist = (
    <Box sx = {{ width: 250}} role="presentation" onClick={toggleDrawer(false)}>
        <List>
            {['inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) =>(
             <ListItem key={text} disablePadding>
                <ListItemButton>
                    <ListItemIcon>

                    </ListItemIcon>
                    <ListItemText primary={text}/>
                </ListItemButton>
             </ListItem>   
            ))}
        </List>
        <Divider/>
        <List>
            {['All mail', 'Trash', 'Spam'].map((text, index)=>(
                <ListItem key={text} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                        </ListItemIcon>
                        <ListItemText primary={text}/>
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    </Box>
    );

    return (
        <div>
            <Button onClick={toggleDrawer(true)}>Open drawer</Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {Draerlist}
            </Drawer>
        </div>
    );
}