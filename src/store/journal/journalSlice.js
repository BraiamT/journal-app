import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        entries: [],
        selectedEntry: null
        // active: {
        //     id: 'ABC123',
        //     title: '',
        //     body: '',
        //     date: 123456,
        //     imageUrls: [],
        // }
    },
    reducers: {
        savingEntry: ( state ) => {
            state.isSaving = true;
        },
        addNewEntry: ( state, action ) => {
            state.entries.push( action.payload );
            state.isSaving = false;
        },
        setSelectedEntry: ( state, action ) => {
            state.selectedEntry = action.payload;
        },
        setEntries: ( state, action ) => {
            state.entries = action.payload;
        },
        setSaving: ( state ) => {
            state.isSaving = true;
            // TODO: Mensaje de error...
        },
        entryUpdated: ( state, action ) => {
            state.isSaving = false;
            state.entries = state.entries.map( entry => {
                if( entry.id === action.payload.id ) {
                    return action.payload;
                }
                return entry;
            });

            // TODO: Mostar mensaje de actualizado
        },
        deleteNoteById: ( state, action ) => {

        },
    }
});


// Action creators are generated for each case reducer function
export const {
    addNewEntry,
    deleteNoteById,
    entryUpdated,
    savingEntry,
    setEntries,
    setSaving,
    setSelectedEntry,
} = journalSlice.actions;
