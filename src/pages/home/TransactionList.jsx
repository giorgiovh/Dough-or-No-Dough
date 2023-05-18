// components
import Transaction from '../../components/Transaction'

export default function TransactionList({ loadedTransactions, onDeleteTransaction, isLoading, error }) {

  return (
    <>
      <h2>Transactions</h2>
      {!isLoading && loadedTransactions && loadedTransactions.length > 0 && loadedTransactions.map(transaction => (
        <div key={transaction.id}>
          <Transaction id={transaction.id} name={transaction.name} amount={transaction.amount} onDelete={onDeleteTransaction}/>
        </div>
      ))}
      {isLoading && <p>loading</p>}
      {error && loadedTransactions.length > 0 && <p>{error}</p>}
      {loadedTransactions.length === 0 && <p>No transactions yet. Add some to see them here!</p>}
    </>
  )
}