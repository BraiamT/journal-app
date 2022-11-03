import { sigInWithGoogle, signUpUser, login as loginProvider, logoutFirebase } from '../../firebase/providers';
import { clearEntriesOnLogout } from '../journal/journalSlice';
import { checkingCredentials, login, logout } from './authSlice';

export const checkingAuth = () => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

    }
}

export const startGoogleSigIn = () => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const result = await sigInWithGoogle();
        if ( !result.ok ) return dispatch( logout(result.errorMessage) );

        dispatch( login(result) );

    }
}

export const startSignUpUser = ({ email, password, username }) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const { ok, uid, photoURL, errorMessage } = await signUpUser({ email, password, username });
        if ( !ok ) return dispatch( logout({ errorMessage }) );

        dispatch( login({ uid, displayName: username, email, photoURL }) );

    }
}

export const startLogin = ({ email, password }) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const result = await loginProvider( email, password );
        
        let errorMessage = '';
        switch (result.errorCode) {
            case 'auth/wrong-password':
                errorMessage = 'Incorrect password, or try loging in with Google';
                break;
                
            case 'auth/too-many-requests':
                errorMessage = 'Too many attempts, try again later';
                break;

            case 'auth/user-not-found':
                errorMessage = 'No user found with that email, register first';
                break;
            
            default:
                errorMessage = result.errorMessage;
                break;
        }
        
        if ( !result.ok ) return dispatch( logout({ errorMessage }) );

        dispatch( login(result) );

    }
}

export const startLogOut = () => {
    return async( dispatch ) => {
        await logoutFirebase();

        dispatch( clearEntriesOnLogout() );
        dispatch( logout({}) );
    }
}
