import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useForm } from '../../hooks';
import { setSelectedEntry, startDeletingEntry, startSavingEntry, startUploadingFiles } from '../../store/journal';
import { ImageGallery } from '../components';

export const EntryView = () => {

    const { selectedEntry, messageSaved, isSaving } = useSelector( state => state.journal );
    const { body, title, date, onInputChange, formState } = useForm( selectedEntry );

    const dateString = useMemo(() => {
        const newDate = new Date( date );
        return newDate.toUTCString();
    }, [ date ]);

    const fileInputRef = useRef();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch( setSelectedEntry(formState) );
    }, [ formState ]);

    useEffect(() => {
        if ( messageSaved.length > 0 ) {
            Swal.fire('Entry updated', messageSaved, 'success');
        }
    }, [ messageSaved ]);

    const onSaveEntry = () => {
        dispatch( startSavingEntry() );
    }

    const onFileInputChange = ({ target }) => {
        if (target.files === 0 ) return;

        dispatch( startUploadingFiles( target.files ) );
    }

    const onDelete = () => {
        console.log("Deleting!!");
        dispatch( startDeletingEntry() );
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
                <input
                    type="file"
                    multiple
                    ref={ fileInputRef }
                    onChange={ onFileInputChange }
                    style={{ display: 'none' }}
                />

                <IconButton
                    color="primary"
                    disabled={ isSaving }
                    onClick={ () => fileInputRef.current.click() }
                >
                    <UploadOutlined />
                </IconButton>

                <Button
                    onClick={ onSaveEntry }
                    color='primary'
                    sx={{ p: 2 }}
                    disabled={ isSaving }
                >
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

                <Grid container justifyContent="end">
                    <Button
                        onClick={ onDelete }
                        sx={{ mt: 2 }}
                        color="error"
                    >
                        <DeleteOutline />
                        Delete
                    </Button>
                </Grid>

                <ImageGallery images={ selectedEntry.imageUrls } />
            </Grid>

        </Grid>
    )
}
