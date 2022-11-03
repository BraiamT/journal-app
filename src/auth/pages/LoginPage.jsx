import { Link as RouterLink } from 'react-router-dom';
import { Google } from '@mui/icons-material';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { startGoogleSigIn, startLogin } from '../../store/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo, useState } from 'react';


const formRegexs = {
    email: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
}

const formValidations = {
    // email: [ (value) => value.includes('@'), 'Enter a valid email' ],
    email: [ (value) => formRegexs.email.test(value), 'Enter a valid email' ],
    password: [ (value) => value.length >= 6, 'Password must have at least 6 characters' ]
}

const formData = {
    email: '',
    password: ''
}

export const LoginPage = () => {

    const { status, errorMessage } = useSelector( state => state.auth );

    const dispatch = useDispatch();
    const [formSubmitted, setFormSubmitted] = useState(false);

    const { email, password, onInputChange, isFormValid, emailValid, passwordValid, formState } = useForm(formData, formValidations);

    const isAuthenticating = useMemo(() => status === 'checking-auth', [status]);

    const onSumbit = ( event ) => {
        event.preventDefault();
        setFormSubmitted(true);

        if ( !isFormValid ) return;
    
        dispatch( startLogin(formState) );
    }

    const onGoogleSigin = () => {
        dispatch( startGoogleSigIn() );
    }

    return (
        <AuthLayout cardTitle="Login">

            <form aria-label='login-form' onSubmit={ onSumbit }>

                <Grid container>

                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField
                            label="Email"
                            type="email"
                            name="email"
                            value={ email }
                            placeholder="cool.email@exaple.com"
                            fullWidth
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
                            name="password"
                            inputProps={{ 'data-testid': 'password-txt' }}
                            value={ password }
                            placeholder="*********"
                            fullWidth
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

                        {/* More sizes: xs sm md xl */}
                        <Grid item xs={ 12 } sm={ 6 }>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={ isAuthenticating }
                                fullWidth
                            >Login</Button>
                        </Grid>

                        <Grid item xs={ 12 } sm={ 6 }>
                            <Button
                                variant="contained"
                                fullWidth
                                aria-label="btn-google-login"
                                disabled={ isAuthenticating }
                                onClick={ onGoogleSigin }
                            >
                                <Google />
                                <span style={{ marginLeft: 8 }}>Google</span>
                                {/* <Typography sx={{ ml: 1 }}>Google</Typography> */}
                            </Button>
                        </Grid>

                    </Grid>

                    <Grid container direction="row" justifyContent="end">
                    <Typography sx={{ mr: 1, fontSize: 'smaller' }}>Dont't have an account?</Typography>
                        <small>
                            <Link component={ RouterLink } color="inherit" to="/auth/register">
                                Register
                            </Link>
                        </small>
                    </Grid>

                </Grid>

            </form>

        </AuthLayout>
    )
}
