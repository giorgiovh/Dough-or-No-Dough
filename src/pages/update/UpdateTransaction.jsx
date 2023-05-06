import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// mui
import { useHttpClient } from '../../hooks/http-hook'
import { UpdateTransactionForm } from './UpdateTransactionForm'

export const UpdateTransaction = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [transaction, setTransaction] = useState({})

  const { id } = useParams()

  useEffect(() => {
    const fetchTransaction = async () => {
      try {        
        const responseData = await sendRequest(`http://localhost:5000/api/transactions/${id}`)

        setTransaction(responseData.transaction)
      } catch (err) {
        // no need to have anything in this catch block as errors are already handled in the sendRequest() function.
      }
    }

    fetchTransaction()
  }, [id, sendRequest])
  
  return (
    <>
      <h2>Update Transaction</h2>
      {!isLoading && transaction && <UpdateTransactionForm transaction={transaction}/>}
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </>
  )
}
