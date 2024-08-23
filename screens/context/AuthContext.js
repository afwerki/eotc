import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(null);

  const login = (user, userRole) => {
    setUsername(user);
    setRole(userRole);
  };

  const logout = () => {
    setUsername(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ username, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
