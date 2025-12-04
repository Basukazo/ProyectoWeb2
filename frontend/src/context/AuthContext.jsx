import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Cargar usuario del localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("authUser"));
    if (saved) setUser(saved);
  }, []);

  // Guardar usuario
  useEffect(() => {
    localStorage.setItem("authUser", JSON.stringify(user));
  }, [user]);

  // Registro
  const register = ({ email, password, name }) => {
    const newUser = {
      id: uuid(),
      email,
      password,
      name,
    };

    localStorage.setItem("registeredUser", JSON.stringify(newUser));
  };

  // Login
  const login = (email, password) => {
    const saved = JSON.parse(localStorage.getItem("registeredUser"));

    if (!saved) return false;
    if (saved.email !== email || saved.password !== password) return false;

    setUser(saved);
    return true;
  };

  // Logout
  const logout = () => {
    setUser(null);
  };

  // Editar perfil
  const updateProfile = (data) => {
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem("registeredUser", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}
