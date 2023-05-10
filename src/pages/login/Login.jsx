import { useState, useContext } from 'react'

// context
import { AuthContext } from '../../context/auth-context'

// hooks
import { useHttpClient } from '../../hooks/http-hook'

// styles
import styles from './Login.module.css'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  const auth = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const responseData = await sendRequest(
        'http://localhost:5000/api/users/login',
        'POST',
        JSON.stringify({
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
    <form onSubmit={handleSubmit} className={styles["login-form"]}>
      <h2>Login</h2>
      <label>
        <span>email:</span>
        <input 
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input 
          type="password" 
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      {!isLoading && <button className="btn">log in</button>}
      {isLoading && <button className="btn" disabled>loading</button>}
      {error && <p>{error}</p>}
    </form>
  )
}
