import { Grid, Typography } from '@mui/material';

export const AuthLayout = ({ children, cardTitle = '' }) => {
    return (
        <Grid
            container
            spacing={ 0 }
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
        >

            <Grid
                item
                className="box-shadow"
                xs={ 3 } // Tamaño en pantallas pequeñas
                sx={{
                    width: { md: 500, sm: 500 },
                    backgroundColor: 'white',
                    padding: 3,
                    borderRadius: 2
                }} // Estilos Extra
            >
                <Typography variant="h5" sx={{ mb: 1 }} align="center">{ cardTitle }</Typography>

                { children }
            </Grid>

        </Grid>
    )
}

{/* More sizes: xs sm md xl */}
