import api from "./api";

export const getChartData = async () => {
  const response = await api.get("/transactions/chart-data");
  return response.data;
};