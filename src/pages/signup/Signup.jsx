import { useState, useContext } from 'react'

// context
import { AuthContext } from '../../context/auth-context'

// hooks
import { useHttpClient } from '../../hooks/http-hook'

// styles
import styles from './Signup.module.css'


export const Signup = () => {
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
    <form onSubmit={handleSubmit} className={styles['signup-form']}>
      <h2>Signup</h2>
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
      <label>
        <span>display name:</span>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </label>
      {!isLoading && <button className="btn">sign up</button>}
      {isLoading && <button className="btn" disabled>loading</button>}
      {error && <p>{error}</p>}
    </form>
  )
}