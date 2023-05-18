import { useState, useContext } from "react"

// hooks
import { useHttpClient } from "../../hooks/http-hook"

// context
import { AuthContext } from "../../context/auth-context"

// mui
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

export const TransactionForm = ({ setLoadedTransactions, clearHomeError }) => {
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
      
      clearHomeError()
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
        <TextField
          id="outlined-basic"
          label="Name"
          variant="standard"
          type="text"
          onChange={e => setName(e.target.value)}
          value={name}
          required
          margin="normal"
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Amount"
          variant="standard"
          type="number"
          onChange={e => setAmount(e.target.value)}
          value={amount}
          required
          margin="normal"
        />
        <br />
        {!isLoading && (
          <Button
            type='submit'
            autoFocus
            variant="contained"
          >
            Submit
          </Button>
        )}
        {isLoading && (
          <Button
            variant="contained"
            disabled
          >
            loading
          </Button>
        )}
        {error && <p>{error}</p>}
      </form>
    </>
  )
}
