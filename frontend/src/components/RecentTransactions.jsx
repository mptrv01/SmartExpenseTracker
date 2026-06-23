import { Link } from "react-router-dom";

function RecentTransactions({ transactions = [] }) {
  return (
    <div className="card recent-transactions">
      <div className="recent-transactions-header">
        <h2>Recent Transactions</h2>

        <Link to="/transactions" className="view-all-link">
          View All
        </Link>
      </div>

      {transactions.length === 0 ? (
        <p className="empty-message">No transactions yet.</p>
      ) : (
        <ul className="recent-transactions-list">
          {transactions.map((transaction) => (
            <li key={transaction._id}>
              <span>{transaction.description}</span>

              <span
                className={
                  transaction.type === "income"
                    ? "income-text"
                    : "expense-text"
                }
              >
                {transaction.type === "income" ? "+" : "-"}$
                {Number(transaction.amount).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecentTransactions;