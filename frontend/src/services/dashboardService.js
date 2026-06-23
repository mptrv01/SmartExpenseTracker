import axios from "axios";

const API_URL = "http://localhost:5000/api/transactions";

export const getDashboardStats = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_URL}/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getRecentTransactions = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_URL}/recent`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};