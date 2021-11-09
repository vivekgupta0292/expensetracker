import './txnHistory.css';
function TxnHistory({data}) {
    return (
        <div className='txnCardWrap'>
            {data && data.map(txn => {
                return <div className={`txnCard ${txn.income ? 'incomeList' : 'expenseList'}`}>
                    <div className='txnType capital'>{txn.type}</div>
                    <div className='txnAmnt'>{!txn.income && '-'}${txn.amount}</div>
                </div>
            })}
        </div>
    );
}
export default TxnHistory;