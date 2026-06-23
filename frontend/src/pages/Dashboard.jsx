import { useEffect, useState } from "react";

import BalanceCard from "../components/BalanceCard";
import IncomeCard from "../components/IncomeCard";
import ExpenseCard from "../components/ExpenseCard";
import RecentTransactions from "../components/RecentTransactions";
import ExpensesByCategoryChart from "../components/ExpensesByCategoryChart";
import MonthlyExpensesChart from "../components/MonthlyExpensesChart";

import {
  getDashboardStats,
  getRecentTransactions,
} from "../services/dashboardService";

import { getChartData } from "../services/chartService";

function Dashboard() {
  const [stats, setStats] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
  });

  const [recentTransactions, setRecentTransactions] = useState([]);

  const [chartData, setChartData] = useState({
    expensesByCategory: [],
    monthlyExpenses: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const [statsData, recentData, chartsData] = await Promise.all([
          getDashboardStats(),
          getRecentTransactions(),
          getChartData(),
        ]);

        setStats({
          balance: statsData.balance,
          income: statsData.income,
          expenses: statsData.expense,
        });

        setRecentTransactions(recentData);

        setChartData({
          expensesByCategory: chartsData.expensesByCategory || [],
          monthlyExpenses: chartsData.monthlyExpenses || [],
        });
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load dashboard data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <p className="loading-message">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="page-title">Dashboard</h1>

      <div className="cards">
        <BalanceCard balance={stats.balance} />
        <IncomeCard income={stats.income} />
        <ExpenseCard expenses={stats.expenses} />
      </div>

      <div className="charts-grid">
        <ExpensesByCategoryChart
          data={chartData.expensesByCategory}
        />

        <MonthlyExpensesChart
          data={chartData.monthlyExpenses}
        />
      </div>

      <RecentTransactions transactions={recentTransactions} />
    </div>
  );
}

export default Dashboard;