// react
import { useContext } from 'react'
import { Link, useNavigate } from "react-router-dom"

// context
import { AuthContext } from "../context/auth-context"

// mui
import Button from '@mui/material/Button'

// styles
import styles from './Navbar.module.css'

export default function Navbar() {
  const auth = useContext(AuthContext)

  const navigate = useNavigate()

  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>Dough or No Dough</li>

        {!auth.isLoggedIn && (
          <>
            <li><Button onClick={() => navigate('/login')} color="inherit">Log In</Button></li>
            <li><Button onClick={() => navigate('/signup')} color="inherit">Sign Up</Button></li>
          </>
        )}
        {auth.isLoggedIn && (
          <>
            <li>
              <Button onClick={() => auth.logout()} color="inherit">Log out</Button>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}