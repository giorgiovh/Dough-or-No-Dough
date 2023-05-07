import { useContext } from 'react'

// components
import Transaction from '../../components/Transaction'

// context
import { AuthContext } from '../../context/auth-context'

export default function TransactionList({ loadedTransactions, onDeleteTransaction, isLoading, error }) {

  const auth = useContext(AuthContext)

  return (
    <>
      <h2>Transactions</h2>
      {!isLoading && loadedTransactions && loadedTransactions.length > 0 && loadedTransactions.map(transaction => (
        <div key={transaction.id}>
          <Transaction id={transaction.id} name={transaction.name} amount={transaction.amount} onDelete={onDeleteTransaction}/>
        </div>
      ))}
      {!auth.userId && <p>Log in to see your transactions!</p>}
      {isLoading && <p>loading</p>}
      {error && <p>{error}</p>}
    </>
  )
}