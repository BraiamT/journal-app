import { collection, deleteDoc, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../../src/firebase/config';
import { addNewEntry, savingEntry, setSelectedEntry } from '../../../src/store/journal/journalSlice';
import { startAddingNewEntry } from '../../../src/store/journal/thunks';

describe('Pruebas en journal/thunks', () => {

    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach( () => jest.clearAllMocks() );

    test('debe de crear una nueva entrada en blanco', async() => {
        const uidTest = 'TEST-UID981';
        getState.mockReturnValue({ auth: { uid: uidTest } });

        await startAddingNewEntry()( dispatch, getState );
        
        expect( dispatch ).toHaveBeenCalledWith( savingEntry() );
        expect( dispatch ).toHaveBeenCalledWith( addNewEntry({
            body: '',
            title: '',
            id: expect.any( String ),
            date: expect.any( Number ),
            imageUrls: []
        }));
        expect( dispatch ).toHaveBeenCalledWith( setSelectedEntry({
            body: '',
            title: '',
            id: expect.any( String ),
            date: expect.any( Number ),
            imageUrls: []
        }));

        // Deleting from Firebase
        const collectionRef = collection( FirebaseDB, `${ uidTest }/journal/entries` );
        const docs = await getDocs( collectionRef );
        
        const deletePromises = [];
        docs.forEach( doc => deletePromises.push( deleteDoc( doc.ref ) ) );
        await Promise.all( deletePromises );
    });

});
