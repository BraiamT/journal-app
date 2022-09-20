import { Box, Grid, Typography } from '@mui/material';

export const NothingSelectedView = () => {
    return (
        <Grid
            className="animate__animated animate__fadeIn animate__faster"
            container
            spacing={ 0 }
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: 'calc(100vh - 110px)' }}
        >

            <Grid item xs={ 12 }>
                <Box
                    component="img"
                    sx={{
                        height: 283,
                        width: 400,
                        maxHeight: { xs: 283, md: 333 },
                        maxWidth: { xs: 400, md: 450 },
                    }}
                    alt="add_tasks"
                    src="/add_tasks.svg"
                />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 5 }}>
                <Typography color='primary.main' variant='h4' sx={{ fontWeight: '500' }}>Select or add an entry :D</Typography>
            </Grid>

        </Grid>
    )
}
