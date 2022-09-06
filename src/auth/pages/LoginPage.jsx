import { Link as RouterLink } from 'react-router-dom';
import { Google } from '@mui/icons-material';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';

export const LoginPage = () => {
    return (
        <AuthLayout cardTitle="Login">

            <form>

                <Grid container>

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

                        {/* More sizes: xs sm md xl */}
                        <Grid item xs={ 12 } sm={ 6 }>
                            <Button variant="contained" fullWidth>Login</Button>
                        </Grid>

                        <Grid item xs={ 12 } sm={ 6 }>
                            <Button variant="contained" fullWidth>
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
