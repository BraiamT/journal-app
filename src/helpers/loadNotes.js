import { collection, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../firebase/config';

export const loadNotes = async( uid = '' ) => {
    if ( !uid ) throw new Error('¡No existe un user id en el store!');

    const collectionRef = collection( FirebaseDB, `${ uid }/journal/entries` );
    const docs = await getDocs(collectionRef);

    const entries = [];
    docs.forEach( doc => {
        entries.push({ id: doc.id, ...doc.data() });
    });
    
    return entries;
}
