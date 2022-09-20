import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { startLogOut } from '../../store/auth/thunks';

export const NavBar = ({ drawerWidth = 240 }) => {

    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch( startLogOut() );
    }

    return (
        <AppBar
            position='fixed'
            sx={{
                width: { md: `calc(100% - ${ drawerWidth }px)` },
                ml: { sm: `${ drawerWidth }px`, md: '0px' }
            }}
        >

            <Toolbar>
                <IconButton
                    color="inherit"
                    edge="start"
                    sx={{ mr: 2, display: { MozTextDecorationLine: 'none' } }}
                >
                    <MenuOutlined />
                </IconButton>

                <Grid container direction='row' justifyContent='space-between' alignItems='center'>

                    <Typography variant='h6' noWrap component='div'>Journal App</Typography>
                    <IconButton color='error' onClick={ onLogout }>
                        <LogoutOutlined />
                    </IconButton>

                </Grid>

            </Toolbar>
            
        </AppBar>
    )
}
