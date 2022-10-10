import { Box, Divider, Drawer, List, Toolbar, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { SideBarItem } from './SideBarItem';

export const SideBar = ({ drawerWidth = 240 }) => {

    const { displayName } = useSelector( state => state.auth );
    const { entries } = useSelector( state => state.journal );

    return (
        <Box
            component='nav'
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, display: { sm: 'none', md: 'block', xs: 'none' } }}
        >

            <Drawer
                variant='permanent' // temporary
                open
                sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
            >

                <Toolbar>
                    <Typography variant='h6' noWrap component='div'>{ displayName }</Typography>
                </Toolbar>
                <Divider />

                <List>
                    {
                        entries.map( entry => (
                            <SideBarItem key={ entry.id } { ...entry } />
                        ))
                    }
                </List>

            </Drawer>

        </Box>
    )
}
