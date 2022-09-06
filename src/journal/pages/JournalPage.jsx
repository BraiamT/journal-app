import { AddOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { JournalLayout } from '../layout/JournalLayout';
import { EntryView, NothingSelectedView } from '../views';

export const JournalPage = () => {
    return (
        <JournalLayout>
            {/* <Typography>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, assumenda debitis modi sit magnam ipsa expedita eum. Nulla, voluptate vero libero explicabo provident ut et itaque obcaecati voluptas? Nemo, quaerat!
            </Typography> */}

            <NothingSelectedView />
            {/* <EntryView /> */}

            <IconButton
                size='large'
                sx={{
                    color: 'white',
                    backgroundColor: 'error.main',
                    ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
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
