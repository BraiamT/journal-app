import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { LoginPage } from '../../../src/auth/pages/LoginPage';
import { authSlice } from '../../../src/store/auth';
import { notAuthenticatedState } from '../../fixtures/authFixtures';

const mockStartGoogleSigIn = jest.fn();
const mockStartLogin = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSigIn: () => mockStartGoogleSigIn,
    startLogin: ({ email, password }) => {
        return () => mockStartLogin({ email, password });
    }
}));

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn(),
}));

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: notAuthenticatedState
    }
});

describe('Pruebas en <LoginPage />', () => {

    beforeEach( () => jest.clearAllMocks() );

    test('debe de mostar el componente correctamente', () => {
        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );
        
        // screen.debug();
        expect( screen.getAllByText('Login').length ).toBeGreaterThanOrEqual(1);
    });

    test('botón de google sigin debe llamar el dispatch con startGoogleSignIn', () => {
        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const googleBtn = screen.getByLabelText('btn-google-login');
        fireEvent.click( googleBtn );

        expect( mockStartGoogleSigIn ).toHaveBeenCalled();
    });

    test('botón de login debe de llamar startLoginWithEmailPassword', () => {
        const email = 'braiam.tejeda@gmail.com';
        const password = 'strongpassword';

        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const emailField = screen.getByRole('textbox', { name: 'Email' });
        fireEvent.change( emailField, { target: { name: 'email', value: email } } );

        const passwordField = screen.getByTestId('password-txt');
        fireEvent.change( passwordField, { target: { name: 'password', value: password } } );

        const loginForm = screen.getByLabelText('login-form');
        fireEvent.submit( loginForm );

        expect( mockStartLogin ).toHaveBeenCalledWith({ email, password });
    });
    
});
