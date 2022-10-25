import { authSlice, checkingCredentials, login, logout } from '../../../src/store/auth/authSlice';
import { authenticatedState, demoUser, initialState } from '../../fixtures/authFixtures';

describe('Pruebas en authSlice', () => {

    test('debe de regresar el estado inicial y llamarse "auth"', () => {
        const state = authSlice.reducer( initialState, {} );
        
        expect( state ).toEqual( initialState );
        expect( authSlice.name ).toBe('auth');
    });

    test('debe de realizar la authentication (login)', () => {
        const state = authSlice.reducer( initialState, login(demoUser) );

        expect( state ).toEqual({
            status: 'authenticated',
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null
        });
    });

    test('debe de realizar el logout sin argumentos(errorMsg)', () => {
        const state = authSlice.reducer( authenticatedState, logout() );

        expect( state ).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined
        });
    });

    test('debe de realizar el logout con argumentos(errorMsg)', () => {
        const errorMessage = 'Generic error msg for testing';
        const state = authSlice.reducer( authenticatedState, logout({ errorMessage }) );

        expect( state ).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage
        });
    });

    test('debe de cambiar el estado a checking-auth', () => {
        const state = authSlice.reducer( authenticatedState, checkingCredentials() );

        expect( state.status ).toBe('checking-auth');
    });

});
