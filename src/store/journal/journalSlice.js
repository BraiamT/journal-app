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
            state.messageSaved = '';
        },
        setEntries: ( state, action ) => {
            state.entries = action.payload;
        },
        setSaving: ( state ) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        entryUpdated: ( state, action ) => {
            state.isSaving = false;
            state.entries = state.entries.map( entry => {
                if( entry.id === action.payload.id ) {
                    return action.payload;
                }
                return entry;
            });

            state.messageSaved = `${ action.payload.title }, was updated succesfully`;
        },
        setPhotosToSelectedEntry: ( state, action ) => {
            state.selectedEntry.imageUrls = [ ...state.selectedEntry.imageUrls, ...action.payload ];
            state.isSaving = false;
        },
        clearEntriesOnLogout: ( state ) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.entries = [];
            state.selectedEntry = null;
        },
        deleteEntryById: ( state, action ) => {
            state.selectedEntry = null;
            state.entries = state.entries.filter( entry => entry.id !== action.payload);
        },
    }
});


// Action creators are generated for each case reducer function
export const {
    addNewEntry,
    clearEntriesOnLogout,
    deleteEntryById,
    entryUpdated,
    savingEntry,
    setEntries,
    setPhotosToSelectedEntry,
    setSaving,
    setSelectedEntry,
} = journalSlice.actions;
