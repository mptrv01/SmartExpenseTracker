import { createContext, useEffect, useState } from "react";
import api from "../services/api";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
  const getProfile = async () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const response = await api.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data);
    } catch (error) {
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  getProfile();
}, []);

  const register = async (name, email, password) => {
    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      setUser(response.data);

      return response.data;
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    localStorage.setItem("token", response.data.token);
    setUser(response.data);

    return response.data;
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
};

const logout = () => {
  localStorage.removeItem("token");
  setUser(null);
};


  return (
    <AuthContext.Provider
     value={{
      user,  
      setUser,
      register,
      login,
      logout,
}}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;