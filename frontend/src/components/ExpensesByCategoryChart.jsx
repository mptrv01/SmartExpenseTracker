import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#f97316",
  "#dc2626",
  "#9333ea",
  "#0891b2",
];

function ExpensesByCategoryChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="chart-card">
        <h2>Expenses by Category</h2>
        <p className="chart-empty">No expense data available.</p>
      </div>
    );
  }

  return (
    <div className="chart-card">
      <h2>Expenses by Category</h2>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={data}
              dataKey="amount"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ category }) => category}
            >
              {data.map((item, index) => (
                <Cell
                  key={`${item.category}-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => [`$${value}`, "Expenses"]}
            />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ExpensesByCategoryChart;