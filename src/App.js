import { useState } from 'react';
import './App.css';
import AddTxn from './components/addTxn/addTxn';
import TxnHistory from './components/txnHistory/txnHistory';

function App() {
  const [transaction, setTransaction] = useState([]);
  const [balance, setBalanace] = useState(0);
  const [income, setincome] = useState(0);
  const [expense, setexpense] = useState(0);
  const [darkmode, setdarkmode] = useState(false);

  const toggleDarkMode = (e) => {
    setdarkmode(e.target.checked);
  }

  const valSuffix = '.00';

  const addTxn = (txnObj) => {
    console.log(txnObj);
    let newTxn = [...transaction, txnObj];
    let newBalance = balance;

    setTransaction(newTxn);
    if(txnObj.income) {
      newBalance += txnObj.amount;
      setincome(income + txnObj.amount);
    }
    else {
      newBalance -= txnObj.amount;
      setexpense(expense + txnObj.amount);
    }
    setBalanace(newBalance);
  }

  return (
    <div className={`AppContainer ${darkmode ? 'dark' : ''}`}>
      <label class="darkModeWrap">
        <input type="checkbox" checked={darkmode} onChange={toggleDarkMode}/>
        <span>dark mode</span>
      </label>
      <div className='appWrap'>
        <h2 className='heading capital'>Expense tracker</h2>
        <h4 className='subHead upper'>your balance</h4>
        <h2 className='amountValue ellipsis'>${balance+valSuffix}</h2>
        <div className='expenseSlab'>
          <div className='valueWrap'>
            <h4 className='subHead upper center'>income</h4>
            <p className='value income ellipsis'>{income+valSuffix}</p>
          </div>
          <div className='seprator'></div>
          <div className='valueWrap'>
            <h4 className='subHead upper center'>expense</h4>
            <p className='value expense ellipsis'>{expense+valSuffix}</p>
          </div>
        </div>
        
        <div className='transactionContainer'>
          <h4 className='subHead underline'>History</h4>
          <TxnHistory data={transaction}/>
        </div>

        <div className='addTransactionContainer'>
          <h4 className='subHead underline'>Add new transaction</h4>
          <AddTxn onSubmit={addTxn} balance={balance}/>
        </div>
      </div>
    </div>
  );
}

export default App;
