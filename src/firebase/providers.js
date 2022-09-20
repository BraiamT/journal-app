import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

export const sigInWithGoogle = async() => {
    try {

        const result = await signInWithPopup( FirebaseAuth, googleProvider );

        // Para obtener las credenciales ( accessToken, idToken, etc... )
        // const credentials = GoogleAuthProvider.credentialFromResult( result );
        // console.log({ credentials });

        const { displayName, email, photoURL, uid } = result.user;
        
        return {
            ok: true,
            // User info
            displayName, email, photoURL, uid
        }

    } catch ( error ) {

        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage
        }

    }
}


export const signUpUser = async({ email, password, username }) => {
    try {

        const response = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
        const { photoURL, uid } = response.user;
        // TODO: actualizar el displayName en FireBase
        await updateProfile( FirebaseAuth.currentUser, { displayName: username } )

        return {
            ok: true,
            // User info
            displayName: username,
            email, photoURL, uid
        }

    } catch ( error ) {

        return {
            ok: false,
            errorMessage: error.message
        }

    }
}


export const login = async ( email, password ) => {
    try {

        const response = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const { displayName, photoURL, uid } = response.user;

        return {
            ok: true,
            // User info
            displayName, email, photoURL, uid
        }

    } catch ( error ) {
        
        return {
            ok: false,
            errorMessage: error.message,
            errorCode: error.code
        }

    }
}

export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
}
