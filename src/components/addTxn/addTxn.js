import { useState } from "react";

function AddTxn(props) {
    const {onSubmit, balance} = props;
    const [txnType, setTxnType] = useState('');
    const [txnAmount, setTxnAmount] = useState('');
    const [showError, setShowError] = useState(false);
    const setTxnT = e => {
        setTxnType(e.target.value);
    }
    const setTxnA = e => {
        setTxnAmount(e.target.value);
    }
    const submitForm = e => {
        e.preventDefault();
        const amount = parseInt(txnAmount);
        const absAmount = Math.abs(amount);
        let txnRes;
        if(!isNaN(amount) && amount !== 0 && txnType) {
            // check for expense
            if(amount < 0 && (balance + amount) < 0) {
                setShowError(true);
                return;
            }

            txnRes = {type: txnType, amount: absAmount};
            if(amount > 0)
                txnRes.income = true;
            else
                txnRes.income = false;
            onSubmit(txnRes);
            setTxnType('');
            setTxnAmount('');
            showError && setShowError(false);
        }
        
    }
    return (
        <form name='addtxn' onSubmit={submitForm}>
            <div className='formField'>
              <label className='formLabel capital' htmlFor='txnType'>text</label>
              <input type='text' className='formInput' id='txnType' value={txnType} onChange={setTxnT}/>
            </div>
            
            <div className='formField'>
              <label className='formLabel' htmlFor='txnAmount'>Amount <br/> <span>(negative-expense,positive-income)</span></label>
              <input type='number' className='formInput' id='txnAmount' value={txnAmount} onChange={setTxnA} />
            </div>
            {showError && <p className='error'> Add expense less than your balance</p>}
            <button type='submit' className='formBtn addTxn'>Add transaction</button>
        </form>
    );

}

export default AddTxn;