import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accountId, setAccountId] = useState(null);
  const [accountInfo, setAccountInfo] = useState(null);

  useEffect(() => {
    loadUserFromStorage();
  }, []);

  const loadUserFromStorage = async () => {
    try {
      const userJson = await AsyncStorage.getItem('user');
      if (userJson) {
        const user = JSON.parse(userJson);
        setLoggedInUser(user);
      }
    } catch (error) {
      console.log('Erreur lors du chargement des informations de connexion depuis le localStorage:', error);
    }
  };

  const setLoggedInUser = (user) => {
    setIsLoggedIn(true);
    setAccountId(user.accountId);
    setAccountInfo(user.accountInfo);
  };

  const login = async (accountId, accountInfo) => {
    try {
      const user = { accountId, accountInfo };
      await AsyncStorage.setItem('user', JSON.stringify(user));
      setLoggedInUser(user);
    } catch (error) {
      console.log('Erreur lors de l\'enregistrement des informations de connexion dans le localStorage:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setIsLoggedIn(false);
      setAccountId(null);
      setAccountInfo(null);
    } catch (error) {
      console.log('Erreur lors de la suppression des informations de connexion depuis le localStorage:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, accountId, accountInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
