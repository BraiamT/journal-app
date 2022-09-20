import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { CheckingAuth } from '../common';
import { useCheckAuth } from '../hooks';
import { JournalRoutes } from '../journal/routes/JournalRoutes';

export const AppRouter = () => {

    const status = useCheckAuth();

    if ( status === 'checking-auth' ) {
        return <CheckingAuth />
    }

    return (
        <Routes>

            {
                status === 'authenticated'
                ? <Route path="/*" element={ <JournalRoutes /> } />
                : <Route path="/auth/*" element={ <AuthRoutes /> } />
            }

            <Route path="/*" element={ <Navigate to='auth/login' /> } /> 

            {/* Login y Registro */}
            {/* <Route path="/auth/*" element={ <AuthRoutes /> } /> */}

            {/* Journal App */}
            {/* <Route path="/*" element={ <JournalRoutes /> } /> */}

        </Routes>
    )
}
