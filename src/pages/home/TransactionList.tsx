import { useEffect, useState } from 'react'

// styles
import styles from './Home.module.css'

interface User {
  name: string;
  // other properties of User object
}

export default function TransactionList() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)
  const [loadedUsers, setLoadedUsers] = useState<User[]>([]) // Provide explicit type annotation here

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true)

      try {
        const response = await fetch('http://localhost:5000/api/users')
        const responseData = await response.json()

        if (!response.ok) {
          throw new Error(responseData.message)
        }

        setLoadedUsers(responseData.users)
      } catch (err: any) {
        setError(err.message)
      }
      setIsLoading(false)
    }
    sendRequest()
  }, [])

  const errorHandler = () => {
    setError(null)
  }

  return (
    <>
      <h2>Transactions</h2>
      {!isLoading && loadedUsers && loadedUsers.length > 0 && loadedUsers.map(user => (
        <p key={user.name}>{user.name}</p> // Make sure to include a key prop for each rendered item
      ))}
      {isLoading && <p>loading</p>}
      {error && <p>{error}</p>}
    </>
  )
}