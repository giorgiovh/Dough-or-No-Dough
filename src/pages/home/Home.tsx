import styles from './Home.module.css'

// components
import { TransactionForm } from './TransactionForm'
import TransactionList from './TransactionList'

export const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <TransactionList />
      </div>
      <div className={styles.sidebar}>
        <TransactionForm />
      </div>
    </div>
  )
}
