// react
import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'

// mui
import { useHttpClient } from '../../hooks/http-hook'
import { UpdateTransactionForm } from './UpdateTransactionForm'

// context
import { AuthContext } from '../../context/auth-context'

export const UpdateTransaction = () => {
  const [transaction, setTransaction] = useState({})
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  const auth = useContext(AuthContext)

  const { id } = useParams()

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/transactions/${id}`,
          'GET',
          null,
          {
            'Authorization': 'Bearer ' + auth.token
          }
        )

        setTransaction(responseData.transaction)
      } catch (err) {
        // no need to have anything in this catch block as errors are already handled in the sendRequest() function.
      }
    }

    fetchTransaction()
  }, [id, sendRequest, auth.token])

  return (
    <div className='page'>
      <h2>Update Transaction</h2>
      {!isLoading && transaction && <UpdateTransactionForm transaction={transaction} />}
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  )
}
