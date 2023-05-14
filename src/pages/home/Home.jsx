import { useState, useEffect, useContext } from 'react'
import { useHttpClient } from '../../hooks/http-hook'
import { Grid } from '@mui/material'

// components
import { TransactionForm } from './TransactionForm'
import TransactionList from './TransactionList'

// context
import { AuthContext } from '../../context/auth-context'

// styles
import styles from './Home.module.css'

export const Home = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [loadedTransactions, setLoadedTransactions] = useState([])

  const auth = useContext(AuthContext)

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/transactions/user/${auth.userId}`,
          'GET',
          null,
          {'Authorization': 'Bearer ' + auth.token}
        )

        setLoadedTransactions(responseData.transactions)
      } catch (err) {
        // no need to have anything in this catch block as errors are already handled in the sendRequest() function.
      }
    }
    if (auth && auth.userId) {
      fetchTransactions()
    } else {
      setLoadedTransactions([])
    }
  }, [sendRequest, auth, auth.userId]) // Since we wrapped sendRequest with useCallback in our custom hook, having it in the dependency array won't create an infinite loop

  const onDeleteTransaction = (deletedTransId) => {
    setLoadedTransactions(prevTransactions => prevTransactions.filter(trans => trans.id !== deletedTransId))
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TransactionForm setLoadedTransactions={setLoadedTransactions}/>
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <TransactionList loadedTransactions={loadedTransactions} onDeleteTransaction={onDeleteTransaction} isLoading={isLoading} error={error}/>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}