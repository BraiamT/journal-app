import { AddOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { startAddingNewEntry } from '../../store/journal';
import { JournalLayout } from '../layout/JournalLayout';
import { EntryView, NothingSelectedView } from '../views';

export const JournalPage = () => {

    const dispatch = useDispatch();
    const { isSaving, selectedEntry } = useSelector( state => state.journal );

    const onAddNewEntry = () => {
        dispatch( startAddingNewEntry() );
    }

    return (
        <JournalLayout>
            {/* <Typography>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, assumenda debitis modi sit magnam ipsa expedita eum. Nulla, voluptate vero libero explicabo provident ut et itaque obcaecati voluptas? Nemo, quaerat!
            </Typography> */}

            {
                !!selectedEntry
                    ? <EntryView />
                    : <NothingSelectedView />
            }

            <IconButton
                size='large'
                onClick={ onAddNewEntry }
                disabled={ isSaving }
                sx={{
                    color: 'white',
                    backgroundColor: 'error.main',
                    ':hover': { backgroundColor: 'error.main', opacity: 0.85 },
                    position: 'fixed',
                    right: 50,
                    bottom: 50
                }}
            >
                <AddOutlined sx={{ fontSize: 30 }} />
            </IconButton>

        </JournalLayout>
    )
}
