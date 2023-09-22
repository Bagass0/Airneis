import React, { createContext, useState } from "react";

export const InfoCommandeContext = createContext();

export const InfoCommandeProvider = ({ children }) => {
  const [adresseLivraison, setLivraison] = useState(null);
  const [adresseFacturation, setFacturation] = useState(null);
  const [paiement, setPaiement] = useState(null);

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
  };

  return (
    <InfoCommandeContext.Provider
      value={{ adresseLivraison, adresseFacturation, paiement, adresseLivraisonSelectionner, adresseLivraisonFacturation, moyenPaiement, reinitialiserCommande, }}
    >
      {children}
    </InfoCommandeContext.Provider>
  );
};
