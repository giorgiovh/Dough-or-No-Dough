import { useState, useContext } from "react"

// hooks
import { useHttpClient } from "../../hooks/http-hook"

// context
import { AuthContext } from "../../context/auth-context"

export const TransactionForm = ({ setLoadedTransactions }) => {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')

  const auth = useContext(AuthContext)
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const responseData = await sendRequest(
        'http://localhost:5000/api/transactions',
        'POST',
        JSON.stringify({
          name,
          amount
        }),
        {
          'Content-Type': "application/json",
          'Authorization': 'Bearer ' + auth.token
        }
      )      

      // this sets the loadedTransaction state with the updated list in the parent component so that the user doesn't have to manually refresh the page to see the updated list
      setLoadedTransactions(responseData.transactions)

      // Redirect the user to a different page
    } catch (err) {
      // no need to do anything here since we're setting the error state in sendRequest()
    }
    setName('')
    setAmount('')
  }

  return (
    <>
      <h3>Add a Transaction</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Transaction name:</span>
          <input
            type="text"
            required
            onChange={(e) => { setName(e.target.value) }}
            value={name}
          />
        </label>
        <label>
          <span>Amount:</span>
          <input
            type="number"
            required
            onChange={(e) => { setAmount(e.target.value) }}
            value={amount}
          />
        </label>
        {!isLoading && <button>Add Transaction</button>}
        {isLoading && <button disabled>loading</button>}
        {error && <p>{error}</p>}
      </form>
    </>
  )
}
