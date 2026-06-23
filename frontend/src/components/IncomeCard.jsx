function IncomeCard({ income }) {
  return (
    <div className="card">
      <h2>Income</h2>
      <h1 style={{ color: "green" }}>
        ${income}
      </h1>
    </div>
  );
}

export default IncomeCard;