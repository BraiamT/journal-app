import { TurnedInNot } from '@mui/icons-material';
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedEntry } from '../../store/journal';

export const SideBarItem = ({ id, title, body, date, imageUrls = [] }) => {
    
    const dispatch = useDispatch();

    const newTitle = useMemo(() => {
        return title.length > 21
            ? title.substring(0, 21) + '...'
            : title;
    }, [ title ]);

    const onSelectEntry = () => {
        dispatch( setSelectedEntry({ id, title, body, date, imageUrls }) );
    }

    return (
        <ListItem disablePadding onClick={ onSelectEntry }>
            <ListItemButton>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>

                    <ListItemText primary={ newTitle } />
                    <ListItemText secondary={ body } />
                    
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
