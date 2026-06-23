import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from "../services/transactionService";

const initialFormData = {
  type: "expense",
  amount: "",
  category: "",
  description: "",
  date: "",
};

const initialFilters = {
  search: "",
  category: "",
  startDate: "",
  endDate: "",
};

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [filters, setFilters] = useState(initialFilters);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      setLoading(true);

      const response = await getTransactions(filters);
      setTransactions(response.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load transactions"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [filters]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;

    setFilters((currentFilters) => ({
      ...currentFilters,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const amount = Number(formData.amount);

    if (!Number.isFinite(amount) || amount <= 0) {
      toast.error("Amount must be greater than 0");
      return;
    }

    if (
      !formData.category.trim() ||
      !formData.description.trim() ||
      !formData.date
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    const transactionData = {
      ...formData,
      amount,
      category: formData.category.trim(),
      description: formData.description.trim(),
    };

    try {
      if (editingId) {
        await updateTransaction(editingId, transactionData);
        toast.success("Transaction updated");
      } else {
        await addTransaction(transactionData);
        toast.success("Transaction added successfully");
      }

      resetForm();
      await fetchTransactions();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  const handleEdit = (transaction) => {
    setEditingId(transaction._id);

    setFormData({
      type: transaction.type,
      amount: transaction.amount,
      category: transaction.category,
      description: transaction.description,
      date: transaction.date
        ? transaction.date.slice(0, 10)
        : "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Delete this transaction?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteTransaction(id);

      if (editingId === id) {
        resetForm();
      }

      toast.success("Transaction deleted");
      await fetchTransactions();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete transaction"
      );
    }
  };

  return (
    <div className="container">
      <h1 className="page-title">Transactions</h1>

      <form
        className="transaction-form"
        onSubmit={handleSubmit}
      >
        <h2>
          {editingId
            ? "Edit Transaction"
            : "Add Transaction"}
        </h2>

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          min="0.01"
          step="0.01"
          value={formData.amount}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          maxLength="50"
          required
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          maxLength="150"
          required
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingId
            ? "Update Transaction"
            : "Add Transaction"}
        </button>

        {editingId && (
          <button
            type="button"
            className="cancel-btn"
            onClick={resetForm}
          >
            Cancel Edit
          </button>
        )}
      </form>

      <div className="filters">
        <input
          type="text"
          name="search"
          placeholder="Search description..."
          value={filters.search}
          onChange={handleFilterChange}
        />

        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
        >
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">
            Entertainment
          </option>
          <option value="Salary">Salary</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="date"
          name="startDate"
          aria-label="Start date"
          value={filters.startDate}
          onChange={handleFilterChange}
        />

        <input
          type="date"
          name="endDate"
          aria-label="End date"
          value={filters.endDate}
          onChange={handleFilterChange}
        />
      </div>

      <div className="table-wrapper">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="empty-message">
                  Loading transactions...
                </td>
              </tr>
            ) : transactions.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty-message">
                  No transactions found
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td>
                    {transaction.date
                      ? transaction.date.slice(0, 10)
                      : "—"}
                  </td>

                  <td>
                    {transaction.type === "income"
                      ? "Income"
                      : "Expense"}
                  </td>

                  <td>{transaction.category}</td>

                  <td>{transaction.description}</td>

                  <td
                    className={
                      transaction.type === "income"
                        ? "income-text"
                        : "expense-text"
                    }
                  >
                    {transaction.type === "income"
                      ? "+"
                      : "-"}
                    ${Number(transaction.amount).toFixed(2)}
                  </td>

                  <td>
                    <button
                      type="button"
                      className="edit-btn"
                      onClick={() =>
                        handleEdit(transaction)
                      }
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(transaction._id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transactions;