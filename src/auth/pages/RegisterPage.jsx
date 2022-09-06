import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';

export const RegisterPage = () => {
    return (
        <AuthLayout cardTitle="Create your new account">

            <form>

                <Grid container>

                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField
                            label="Username"
                            type="text"
                            placeholder="John Doe"
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField
                            label="Email"
                            type="email"
                            placeholder="cool.email@exaple.com"
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField
                            label="Password"
                            type="password"
                            placeholder="*********"
                            fullWidth
                        />
                    </Grid>

                    <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>

                        <Grid item xs={ 12 }>
                            <Button variant="contained" fullWidth>Register</Button>
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
