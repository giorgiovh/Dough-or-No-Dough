import { useState, useContext } from "react"

// hooks
import { useHttpClient } from "../../hooks/http-hook"

// context
import { AuthContext } from "../../context/auth-context"

export const TransactionForm = () => {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')

  const auth = useContext(AuthContext)
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await sendRequest(
        'http://localhost:5000/api/transactions',
        'POST',
        JSON.stringify({
          name,
          amount,
          creator: auth.userId
        }),
        { 'Content-Type': "application/json" }
      )

      // Redirect the user to a different page
    } catch (err) {
      // no need to do anything here since we're setting the error state in sendRequest()
    }
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
