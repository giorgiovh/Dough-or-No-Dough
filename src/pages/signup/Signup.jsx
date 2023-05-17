import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useContext, useState } from 'react';
import { useHttpClient } from '../../hooks/http-hook';
import { AuthContext } from '../../context/auth-context';

const theme = createTheme();

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  const auth = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const responseData = await sendRequest(
        'http://localhost:5000/api/users/signup',
        'POST',
        JSON.stringify({
          name,
          email,
          password
        }),
        {
          'Content-Type': 'application/json'
        }
      )
      auth.login(responseData.userId, responseData.token)
    } catch (err) {
      // no need to have anything in this catch block as errors are already handled in the sendRequest() function. The try/catch here is only used so that auth.login() is only called if there was no error in sendRequest()
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="displayName"
                  required
                  fullWidth
                  id="displayName"
                  label="Display Name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </Grid>
            </Grid>
            {!isLoading && (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            )}
            {isLoading && (
              <Button
                disabled
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Loading
              </Button>
            )}
            {error && <p>{error}</p>}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}