import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accountId, setAccountId] = useState(null);
  const [accountInfo, setAccountInfo] = useState(null);

  useEffect(() => {
    const isLoggedInSession = sessionStorage.getItem('isLoggedIn');

    if (isLoggedInSession) {
      setIsLoggedIn(true);
      const accountIdSession = sessionStorage.getItem('accountId');
      setAccountId(accountIdSession);

      // Récupérer et définir les informations du compte depuis la session
      const accountInfoSession = sessionStorage.getItem('accountInfo');
      setAccountInfo(JSON.parse(accountInfoSession));
    }
  }, []);

  const login = (accountId, accountInfo) => {
    setIsLoggedIn(true);
    setAccountId(accountId);
    setAccountInfo(accountInfo);
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('accountId', accountId);
    sessionStorage.setItem('accountInfo', JSON.stringify(accountInfo));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setAccountId(null);
    setAccountInfo(null);
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('accountId');
    sessionStorage.removeItem('accountInfo');
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, accountId, accountInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
