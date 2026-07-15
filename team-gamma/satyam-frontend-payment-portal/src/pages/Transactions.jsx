import { useState } from "react";
import { getTransactionHistory } from "../api/paymentApi";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import TransactionCard from "../components/TransactionCard";

function Transactions() {
  const [userId, setUserId] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  async function loadTransactions() {
    if (!userId.trim()) {
      setError("Please enter a Customer ID to search transactions.");
      setTransactions([]);
      setSearched(false);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSearched(true);

      const data = await getTransactionHistory(userId.trim());
      setTransactions(data.transactions || []);
    } catch (err) {
      setError(err.message);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <p className="tag">
            <span></span>
            History
          </p>
          <h1>Transaction History</h1>
        </div>

        <div className="search-box">
          <input
            type="text"
            value={userId}
            onChange={(event) => setUserId(event.target.value)}
            placeholder="Enter Customer ID"
          />
          <button onClick={loadTransactions}>Search</button>
        </div>
      </div>

      <ErrorMessage message={error} />

      {loading ? (
        <Loader text="Loading transactions..." />
      ) : transactions.length > 0 ? (
        <div className="transaction-list">
          {transactions.map((transaction) => (
            <TransactionCard
              key={transaction.transactionId}
              transaction={transaction}
            />
          ))}
        </div>
      ) : searched ? (
        <div className="empty-box">
          <h2>No transactions found</h2>
          <p>No payment records are available for this Customer ID.</p>
        </div>
      ) : (
        <div className="empty-box">
          <h2>Search transaction records</h2>
          <p>Enter a Customer ID to view payment history.</p>
        </div>
      )}
    </section>
  );
}

export default Transactions;