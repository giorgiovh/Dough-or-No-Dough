import { useEffect, useState } from 'react'

// hooks
import { useHttpClient } from '../../hooks/http-hook';

// styles
import styles from './Home.module.css'

export default function TransactionList() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [loadedUsers, setLoadedUsers] = useState([])

  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest('http://localhost:5000/api/users')

        setLoadedUsers(responseData.users)
      } catch (err) {
        // no need to have anything in this catch block as errors are already handled in the sendRequest() function.
      }
    }
    fetchUsers()
  }, [sendRequest]) // Since we wrapped sendRequest with useCallback in our custom hook, having it in the dependency array won't create an infinite loop

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