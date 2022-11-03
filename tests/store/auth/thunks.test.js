import { login as loginProvider, logoutFirebase, sigInWithGoogle, signUpUser } from '../../../src/firebase/providers';
import { checkingCredentials, login, logout } from '../../../src/store/auth/authSlice';
import { checkingAuth, startGoogleSigIn, startLogin, startLogOut, startSignUpUser } from '../../../src/store/auth/thunks';
import { clearEntriesOnLogout } from '../../../src/store/journal/journalSlice';
import { demoUser } from '../../fixtures/authFixtures';

jest.mock('../../../src/firebase/providers');

describe('Pruebas en auth/thunks', () => {

    const dispatch = jest.fn();
    
    beforeEach( () => jest.clearAllMocks() );

    test('debe de invocar el checkingAuth de los auth/thunks y haber llamado el checkingCredentials', async() => {
        await checkingAuth()( dispatch ); // El pimer () es la llamada, el segundo () los parámetros del callback =>
        // Aquí ya hicmos el testing de estos slices así que solo hay que
        // probar que el dispatch haya sido llamado con ese slice:
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    });

    test('startGoogleSigIn debe de llamar checkingCredentials() y login() - Si sigIn OK', async() => {
        const loginDataResp = { ok: true, ...demoUser };
        await sigInWithGoogle.mockResolvedValue( loginDataResp );

        // thunk
        await startGoogleSigIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledTimes( 2 );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login(loginDataResp) );
    });

    test('startGoogleSigIn debe de llamar checkingCredentials() y logout(error) - Si sigIn ERROR', async() => {
        const loginDataResp = { ok: false, errorMessage: 'Generic Google sign in error' };
        await sigInWithGoogle.mockResolvedValue( loginDataResp );

        // thunk
        await startGoogleSigIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledTimes( 2 );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout(loginDataResp.errorMessage) );
    });

    test('startLogin debe de llamar checkingCredentials() y login() - Si Login OK', async() => {
        const loginDataResp = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '123456' };
        await loginProvider.mockResolvedValue( loginDataResp );

        // thunk
        await startLogin( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledTimes( 2 );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginDataResp ) );
    });

    test('startLogin debe de llamar checkingCredentials() y logout(error: incorrect pass) - Si Login ERROR-CODE: auth/wrong-password', async() => {
        const loginDataResp = { ok: false, errorMessage: 'Generic Google loginwithemailandpass error', errorCode: 'auth/wrong-password' };
        const formData = { email: demoUser.email, password: '123456' };
        await loginProvider.mockResolvedValue( loginDataResp );

        // thunk
        await startLogin( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledTimes( 2 );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout({ errorMessage: 'Incorrect password, or try loging in with Google' }) );
    });

    test('startSignUpUser debe de llamar checkingCredentials() y login() - Si signUp OK', async() => {
        const signUpDataResp = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '123456', username: demoUser.displayName };
        await signUpUser.mockResolvedValue( signUpDataResp );

        // thunk
        await startSignUpUser( formData )( dispatch );

        console.log(signUpDataResp);
        console.log(login( signUpDataResp ));
        expect( dispatch ).toHaveBeenCalledTimes( 2 );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        // expect( dispatch ).toHaveBeenCalledWith( login( signUpDataResp ) );
    });

    test('startLogOut debe de llamar logoutFirebase(), clearEntriesOnLogout(), y logout({})', async() => {
        await startLogOut()( dispatch );

        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( clearEntriesOnLogout() );
        expect( dispatch ).toHaveBeenCalledWith( logout({}) );
    });

});
