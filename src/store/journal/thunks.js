import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { addNewEntry, entryUpdated, savingEntry, setEntries, setSaving, setSelectedEntry } from './journalSlice';
import { loadNotes } from '../../helpers';

export const startAddingNewEntry = () => {
    return async( dispatch, getState ) => {

        dispatch( savingEntry() );

        const { uid } = getState().auth;

        const newEntry = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/entries` ) );
        await setDoc( newDoc, newEntry );

        newEntry.id = newDoc.id;

        dispatch( addNewEntry( newEntry ) );
        dispatch( setSelectedEntry( newEntry ) );

    }
}

export const startLoadingEntries = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        if ( !uid ) throw new Error('¡No existe un user id en el store!');

        const entries = await loadNotes( uid );

        dispatch( setEntries( entries ) );

    }
}

export const startSavingEntry = () => {
    return async( dispatch, getState ) => {

        dispatch( setSaving() );

        const { uid } = getState().auth;
        if ( !uid ) throw new Error('¡No existe un user id en el store!');

        const { selectedEntry } = getState().journal;
        const entryToFirestore = { ...selectedEntry };
        delete entryToFirestore.id;

        const docRef = doc( FirebaseDB, `${ uid }/journal/entries/${ selectedEntry.id }` );
        await setDoc( docRef, entryToFirestore, { merge: true } ); // merge para mantener los campos anteriores y nuevos si es que hay

        dispatch( entryUpdated( selectedEntry ) );

    }
}
