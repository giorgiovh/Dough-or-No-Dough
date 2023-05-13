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
      {error && <p>{error}</p>}
    </>
  )
}