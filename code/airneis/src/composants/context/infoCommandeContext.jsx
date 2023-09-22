import React, { createContext, useState, useEffect } from "react";

export const InfoCommandeContext = createContext();

export const InfoCommandeProvider = ({ children }) => {
  const [adresseLivraison, setLivraison] = useState(null);
  const [adresseFacturation, setFacturation] = useState(null);
  const [Paiement, setPaiement] = useState(null);

  useEffect(() => {
    const storedAdresseLivraison = sessionStorage.getItem("adresseLivraison");
    const storedAdresseFacturation = sessionStorage.getItem("adresseFacturation");
    const storedPaiement = sessionStorage.getItem("paiement");

    if (storedAdresseLivraison) {
      setLivraison(JSON.parse(storedAdresseLivraison));
    }
    if (storedAdresseFacturation) {
      setFacturation(JSON.parse(storedAdresseFacturation));
    }
    if (storedPaiement) {
      setPaiement(JSON.parse(storedPaiement));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("adresseLivraison", JSON.stringify(adresseLivraison));
    sessionStorage.setItem("adresseFacturation", JSON.stringify(adresseFacturation));
    sessionStorage.setItem("paiement", JSON.stringify(Paiement));
  }, [adresseLivraison, adresseFacturation, Paiement]);

  const adresseLivraisonSelectionner = (adresse) => {
    setLivraison(adresse);
  };

  const adresseLivraisonFacturation = (adresse) => {
    setFacturation(adresse);
  };

  const moyenPaiement = (paiement) => {
    setPaiement(paiement);
  };

  const reinitialiserCommande = () => {
    setLivraison(null);
    setFacturation(null);
    setPaiement(null);
    sessionStorage.removeItem("adresseLivraison");
    sessionStorage.removeItem("adresseFacturation");
    sessionStorage.removeItem("paiement");
  };

  return (
    <InfoCommandeContext.Provider
      value={{
        adresseLivraison,
        adresseFacturation,
        Paiement,
        adresseLivraisonSelectionner,
        adresseLivraisonFacturation,
        moyenPaiement,
        reinitialiserCommande,
      }}
    >
      {children}
    </InfoCommandeContext.Provider>
  );
};
