import api from "./api";

export const getTransactions = (params) => {
  return api.get("/transactions", { params });
};

export const addTransaction = (transactionData) => {
  return api.post("/transactions", transactionData);
};

export const updateTransaction = (id, transactionData) => {
  return api.put(`/transactions/${id}`, transactionData);
};

export const deleteTransaction = (id) => {
  return api.delete(`/transactions/${id}`);
};