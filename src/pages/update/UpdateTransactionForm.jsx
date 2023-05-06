import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// mui
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

export const UpdateTransactionForm = ({ transaction }) => {
  const [name, setName] = useState(transaction.name)
  const [amount, setAmount] = useState(transaction.amount)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
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
