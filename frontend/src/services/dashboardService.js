import api from "./api";

export const getDashboardStats = async () => {
  const response = await api.get("/transactions/stats");
  return response.data;
};

export const getRecentTransactions = async () => {
  const response = await api.get("/transactions/recent");
  return response.data;
};