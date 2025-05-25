import { createContext, useState, useEffect ,useContext} from "react";
import api from "../utils/api";

export const authcontext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await api.login(credentials);
      localStorage.setItem("token", response.data.token);
      setUser({ username: credentials.username });
      return { sucess: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "login failed",
      };
    }
  };

  const signup = async (credentials) => {
    try {
      const response = await api.signup(credentials);
      localStorage.setItem("token", response.data.token);
      setUser({ username: credentials.userName });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Signup failed",
      };
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };
  return (
    <authcontext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </authcontext.Provider>
  );
};

export const useAuth = () => {
  return useContext(authcontext);
};
