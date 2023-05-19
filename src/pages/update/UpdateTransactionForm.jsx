// react
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// mui
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

// hooks
import { useHttpClient } from '../../hooks/http-hook'

// context
import { AuthContext } from '../../context/auth-context'

export const UpdateTransactionForm = ({ transaction }) => {
  const [name, setName] = useState(transaction.name)
  const [amount, setAmount] = useState(transaction.amount)

  const auth = useContext(AuthContext)

  const navigate = useNavigate()

  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/transactions/${transaction.id}`,
        'PATCH',
        JSON.stringify({
          name,
          amount
        }),
        {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + auth.token
        }
      )

      navigate('/')
    } catch (err) {
      // no need to do anything here since we're setting the error state in sendRequest()
    }
  }

  return (
    <>
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
        <Button
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
        <Button
          type='submit'
          autoFocus
          variant="contained"
        >
          Submit
        </Button>
      </form>
    </>
  )
}
