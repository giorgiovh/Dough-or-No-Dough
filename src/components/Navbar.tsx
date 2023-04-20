import { useContext } from 'react'
import { Link } from "react-router-dom"

// styles
import styles from './Navbar.module.css'

// context
import { AuthContext } from "../context/auth-context"

export default function Navbar() {
  const auth = useContext(AuthContext)

  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>myMoney</li>

        {!auth.isLoggedIn && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        )}
        {auth.isLoggedIn && (
          <>
            <li>hello</li>
            <li>
              <button className="btn" onClick={() => auth.logout()}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}