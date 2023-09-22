import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Footer from './composants/Footer';
import Menu from './composants/Menu';
import { DataContextProvider } from "./composants/context/dataContext";
import { AuthProvider } from './composants/context/authContext';
import { InfoCommandeProvider } from './composants/context/infoCommandeContext';

function App() {
  return (
    <AuthProvider>
      <DataContextProvider>
        <InfoCommandeProvider>
          <Menu />
          <Outlet />
          <div className="Min-heightConteiner-footer"></div>
          <Footer />
        </InfoCommandeProvider>
      </DataContextProvider>
    </AuthProvider>
  );
}

export default App;
