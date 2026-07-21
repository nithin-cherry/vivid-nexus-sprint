function TransactionCard({ transaction }) {
  const status = transaction.status?.toLowerCase() || "pending";

  return (
    <div className="transaction-card">
      <div>
        <h3>{transaction.purpose || "Payment"}</h3>
        <p>Transaction ID: {transaction.transactionId}</p>
        <p>User ID: {transaction.userId}</p>
        <p>Name: {transaction.name}</p>
      </div>

      <div className="transaction-meta">
        <h3>₹{transaction.amount}</h3>
        <span className={`status-badge ${status}`}>{transaction.status}</span>
      </div>
    </div>
  );
}

export default TransactionCard;