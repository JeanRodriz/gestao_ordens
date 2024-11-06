import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../services/api"; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); 

  // Verifica a autenticação ao carregar a página
  useEffect(() => {
    const token = localStorage.getItem("token");
    
    // Se o token existe, tenta validar (caso seja necessário)
    if (token) {
      
      setIsAuthenticated(true);
    }
    
    setLoading(false); // Quando terminar a verificação, defina o loading como false
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post("/login", { email, password });
      const token = response.data.token;

      if (token) {
        // Salvar o token no localStorage
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
        return true; 
      }
      return false;
    } catch (error) {
      console.error("Login failed", error);
      return false;
    }
  };

  const logout = () => {
    // Remove o token do localStorage
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {loading ? null : children} 
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
