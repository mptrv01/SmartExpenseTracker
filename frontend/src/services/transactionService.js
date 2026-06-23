import api from "./api";

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getTransactions = (params) => {
  return api.get("/transactions", {
    params,
    ...getAuthHeaders(),
  });
};

export const addTransaction = (transactionData) => {
  return api.post("/transactions", transactionData, getAuthHeaders());
};

export const updateTransaction = (id, transactionData) => {
  return api.put(`/transactions/${id}`, transactionData, getAuthHeaders());
};

export const deleteTransaction = (id) => {
  return api.delete(`/transactions/${id}`, getAuthHeaders());
};