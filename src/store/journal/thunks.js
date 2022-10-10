import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { addNewEntry, deleteEntryById, entryUpdated, savingEntry, setEntries, setPhotosToSelectedEntry, setSaving, setSelectedEntry } from './journalSlice';
import { fileUpload, loadNotes } from '../../helpers';

export const startAddingNewEntry = () => {
    return async( dispatch, getState ) => {

        dispatch( savingEntry() );

        const { uid } = getState().auth;

        const newEntry = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrls: []
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

export const startUploadingFiles = ( files = [] ) => {
    return async( dispatch ) => {

        dispatch( setSaving() );

        // await fileUpload( files[0] );
        // Para ejecutar todas las peticiones al mismo tiempo:
        const fileUploadPromises = [];
        for ( const file of files ) {
            fileUploadPromises.push( fileUpload( file ) );
        }

        const photosUrls = await Promise.all( fileUploadPromises );
        
        dispatch( setPhotosToSelectedEntry( photosUrls ) );

    }
}

export const startDeletingEntry = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        const { selectedEntry } = getState().journal;

        const docRef = doc( FirebaseDB, `${ uid }/journal/entries/${ selectedEntry.id }` );
        // It's always an option to add try catch in here:
        await deleteDoc( docRef );

        dispatch( deleteEntryById( selectedEntry.id ) );

    }
}
