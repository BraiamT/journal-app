export const initialState = {
    status: 'checking-auth', // checking-auth, not-authenticated, authenticated
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
};

export const authenticatedState = {
    status: 'authenticated', // checking-auth, not-authenticated, authenticated
    uid: '123ABC',
    email: 'demo@example.com',
    displayName: 'John Doe',
    photoURL: 'https://demo.jpg',
    errorMessage: null
};

export const notAuthenticatedState = {
    status: 'not-authenticated', // checking-auth, not-authenticated, authenticated
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
};

export const demoUser = {
    uid: 'ABC123',
    email: 'demo@example.com',
    displayName: 'John Doe',
    photoURL: 'https://demo.jpg'
}
