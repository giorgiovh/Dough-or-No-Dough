import { useEffect, useState, useContext } from 'react'

// hooks
import { useHttpClient } from '../../hooks/http-hook';

// context
import { AuthContext } from '../../context/auth-context'

export default function TransactionList() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [loadedTransactions, setLoadedTransactions] = useState([])

  const auth = useContext(AuthContext)

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/transactions/user/${auth.userId}`)

        setLoadedTransactions(responseData.transactions)
      } catch (err) {
        // no need to have anything in this catch block as errors are already handled in the sendRequest() function.
      }
    }
    if (auth && auth.userId) {
      fetchTransactions()
    } else {
      setLoadedTransactions([])
    }
  }, [sendRequest, auth, auth.userId]) // Since we wrapped sendRequest with useCallback in our custom hook, having it in the dependency array won't create an infinite loop

  return (
    <>
      <h2>Transactions</h2>
      {!isLoading && loadedTransactions && loadedTransactions.length > 0 && loadedTransactions.map(transaction => (
        <div key={transaction.id}>
          <p>{transaction.name}</p>
          <p>${transaction.amount}</p>
        </div>
      ))}
      {!auth.userId && <p>Log in to see your transactions!</p>}
      {isLoading && <p>loading</p>}
      {error && <p>{error}</p>}
    </>
  )
}