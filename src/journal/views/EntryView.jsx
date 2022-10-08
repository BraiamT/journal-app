import { SaveOutlined } from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks';
import { setSelectedEntry, startSavingEntry } from '../../store/journal';
import { ImageGallery } from '../components';

export const EntryView = () => {

    const { selectedEntry } = useSelector( state => state.journal );
    const { body, title, date, onInputChange, formState } = useForm( selectedEntry );

    const dateString = useMemo(() => {
        const newDate = new Date( date );
        return newDate.toUTCString();
    }, [ date ]);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch( setSelectedEntry(formState) );
    }, [ formState ]);

    const onSaveEntry = () => {
        dispatch( startSavingEntry() );
    }

    return (
        <Grid
            className="animate__animated animate__fadeIn animate__faster"
            container
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            sx={{ mb: 1 }}
        >

            <Grid item>
                <Typography fontSize={ 39 } fontWeight='light'>{ dateString }</Typography>
            </Grid>

            <Grid item>
                <Button onClick={ onSaveEntry } color='primary' sx={{ p: 2 }}>
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
                    name="title"
                    value={ title }
                    onChange={ onInputChange }
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
                    name="body"
                    value={ body }
                    onChange={ onInputChange }
                    sx={{ border: 'none', my: 1 }}
                />

                <ImageGallery />
            </Grid>

        </Grid>
    )
}
