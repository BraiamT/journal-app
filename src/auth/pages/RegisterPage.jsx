import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography, Alert } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSignUpUser } from '../../store/auth/thunks';

const initForm = {
    username: '',
    email: '',
    password: ''
}

const formRegexs = {
    email: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
}

const formValidations = {
    // email: [ (value) => value.includes('@'), 'Enter a valid email' ],
    email: [ (value) => formRegexs.email.test(value), 'Enter a valid email' ],
    password: [ (value) => value.length >= 6, 'Password must have at least 6 characters' ],
    username: [ (value) => value.length >= 1, 'Username is required' ]
}

export const RegisterPage = () => {

    const dispatch = useDispatch();
    const [formSubmitted, setFormSubmitted] = useState(false);

    const { status, errorMessage } = useSelector( state => state.auth );
    const isAuthenticating = useMemo(() => status === 'checking-auth', [status]);

    const {
        formState, username, email, password, onInputChange,
        isFormValid, usernameValid, emailValid, passwordValid
    } = useForm( initForm, formValidations );

    const onSubmit = ( event ) => {
        event.preventDefault();
        setFormSubmitted(true);

        if ( !isFormValid ) return;

        dispatch( startSignUpUser(formState) );
    }

    return (
        <AuthLayout cardTitle="Create your new account">

            <form onSubmit={ onSubmit }>

                <Grid container>

                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField
                            label="Username"
                            type="text"
                            placeholder="John Doe"
                            fullWidth
                            value={ username }
                            name="username"
                            onChange={ onInputChange }
                            error={ !!usernameValid && formSubmitted }
                            className={ (!!usernameValid && formSubmitted) ? 'errorShake' : '' }
                            helperText={ formSubmitted ? usernameValid : null }
                        />
                    </Grid>

                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField
                            label="Email"
                            type="email"
                            placeholder="cool.email@exaple.com"
                            fullWidth
                            value={ email }
                            name="email"
                            onChange={ onInputChange }
                            error={ !!emailValid && formSubmitted }
                            className={ (!!emailValid && formSubmitted) ? 'errorShake' : '' }
                            helperText={ formSubmitted ? emailValid : null }
                        />
                    </Grid>

                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField
                            label="Password"
                            type="password"
                            placeholder="*********"
                            fullWidth
                            value={ password }
                            name="password"
                            onChange={ onInputChange }
                            error={ !!passwordValid && formSubmitted }
                            className={ (!!passwordValid && formSubmitted) ? 'errorShake' : '' }
                            helperText={ formSubmitted ? passwordValid : null }
                        />
                    </Grid>

                    <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>

                        <Grid
                            item
                            xs={ 12 }
                            display={ !!errorMessage ? '' : 'none' }
                        >
                            <Alert severity='error'>{ errorMessage }</Alert>
                        </Grid>

                        <Grid item xs={ 12 }>
                            <Button
                                variant="contained"
                                fullWidth
                                type="submit"
                                disabled={ isAuthenticating }
                            >Register</Button>
                        </Grid>

                    </Grid>

                    <Grid container direction="row" justifyContent="end">
                        <Typography sx={{ mr: 1, fontSize: 'smaller' }}>Already have an account?</Typography>
                        <small>
                            <Link component={ RouterLink } color="inherit" to="/auth/login">
                                Login
                            </Link>
                        </small>
                    </Grid>

                </Grid>

            </form>

        </AuthLayout>
    )
}
