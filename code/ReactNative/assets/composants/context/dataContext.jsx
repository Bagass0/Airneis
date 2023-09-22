import { useState, createContext } from "react";

export const dataContext = createContext();

export function DataContextProvider({ children }) {
  const [panier, setPanier] = useState({});
  const [nombreProduits, setNombreProduits] = useState(0);

  function ajouter(produit) {
    const nouveauPanier = { ...panier };
    if (nouveauPanier[produit.id]) {
      // Le produit existe déjà dans le panier
      if (nouveauPanier[produit.id].quantite < produit.stock) {
        // Vérifier si la quantité ajoutée ne dépasse pas le stock disponible
        nouveauPanier[produit.id].quantite += 1;
        setPanier(nouveauPanier);
        setNombreProduits(nombreProduits + 1);
      }
    } else {
      // Le produit n'existe pas dans le panier
      nouveauPanier[produit.id] = { ...produit, quantite: 1 };
      setPanier(nouveauPanier);
      setNombreProduits(nombreProduits + 1);
    }
  }

  function retirer(produit) {
    const nouveauPanier = { ...panier };
    if (nouveauPanier[produit.id].quantite > 1) {
      // si le produit a une quantité supérieure à 1, on la diminue
      nouveauPanier[produit.id].quantite -= 1;
    } else {
      // sinon, on le retire complètement du panier
      delete nouveauPanier[produit.id];
    }
    setPanier(nouveauPanier);
    setNombreProduits(nombreProduits - 1);
  }

  function supprimer(produit) {
    const nouveauPanier = { ...panier };
    delete nouveauPanier[produit.id]; // on supprime complètement le produit du panier
    setPanier(nouveauPanier);
    setNombreProduits(nombreProduits - produit.quantite); // on soustrait la quantité du produit supprimé du nombre total de produits dans le panier
  }

  function getTotalProduit(produit) {
    const prix = parseFloat(produit.prix) || 0;
    return prix * produit.quantite;
  }

  function getTotalPanier() {
    let total = 0;
    Object.values(panier).forEach((produit) => {
      total += getTotalProduit(produit);
    });
    return total;
  }

  function reinitialiserPanier() {
    setPanier({});
    setNombreProduits(0);
  }

  return (
    <dataContext.Provider
      value={{
        panier: Object.values(panier),
        nombreProduits,
        ajouter,
        retirer,
        supprimer,
        getTotalProduit,
        getTotalPanier,
        reinitialiserPanier,
      }}
    >
      {children}
    </dataContext.Provider>
  );
}
