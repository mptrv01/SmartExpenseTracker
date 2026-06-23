import api from "./api";

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getChartData = async () => {
  const response = await api.get(
    "/transactions/chart-data",
    getAuthHeaders()
  );

  return response.data;
};