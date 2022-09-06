import { SaveOutlined } from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { ImageGallery } from '../components';

export const EntryView = () => {
    return (
        <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>

            <Grid item>
                <Typography fontSize={ 39 } fontWeight='light'>August 29, 2023</Typography>
            </Grid>

            <Grid item>
                <Button color='primary' sx={{ p: 2 }}>
                    <SaveOutlined sx={{ fontSize: 28, mr: 1 }}/>
                    Save
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Cool title..."
                    label="Title"
                    sx={{ border: 'none', my: 1 }}
                />

                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    minRows={ 2 }
                    placeholder="What happened today? :D"
                    label="Description"
                    sx={{ border: 'none', my: 1 }}
                />

                <ImageGallery />
            </Grid>

        </Grid>
    )
}
