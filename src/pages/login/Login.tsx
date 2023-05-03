import { useState, useContext } from 'react'

// context
import { AuthContext } from '../../context/auth-context'

// styles
import styles from './Login.module.css'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  const auth = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setIsLoading(true)
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      })

      const responseData = await response.json()

      // this is to check whether or not the response was code 400 or 500 and if it was, throw an error
      if (!response.ok) {
        throw new Error(responseData.message)
      }
      setIsLoading(false)
      auth.login()
    } catch (err: any) {
      setIsLoading(false)
      setError(err.message)
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
