function ExpenseCard({ expenses }) {
  return (
    <div className="card">
      <h2>Expenses</h2>
      <h1 style={{ color: "red" }}>${expenses || 0}</h1>
    </div>
  );
}

export default ExpenseCard;