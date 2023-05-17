// react
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';

// mui
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// context
import { AuthContext } from "../context/auth-context"

export default function Navbar() {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            Dough or No Dough
          </Typography>
          {!auth.isLoggedIn && (
            <>
              <Button onClick={() => navigate('/login')} color="inherit">Log In</Button>
              <Button onClick={() => navigate('/signup')} color="inherit">Sign Up</Button>
            </>
          )}
          {auth.isLoggedIn && (
            <Button onClick={() => auth.logout()} color="inherit">Log Out</Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}