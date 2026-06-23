import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function MonthlyExpensesChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="chart-card">
        <h2>Monthly Expenses</h2>
        <p className="chart-empty">No monthly expense data available.</p>
      </div>
    );
  }

  const formattedData = data.map((item) => {
    const [year, monthNumber] = item.month.split("-");

    const monthName = new Intl.DateTimeFormat("en-US", {
      month: "short",
    }).format(new Date(Number(year), Number(monthNumber) - 1, 1));

    return {
      ...item,
      displayMonth: `${monthName} ${year}`,
    };
  });

  return (
    <div className="chart-card">
      <h2>Monthly Expenses</h2>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="displayMonth" />

            <YAxis />

            <Tooltip
              formatter={(value) => [
                `$${Number(value).toFixed(2)}`,
                "Expenses",
              ]}
            />

            <Bar
              dataKey="amount"
              fill="#2563eb"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MonthlyExpensesChart;