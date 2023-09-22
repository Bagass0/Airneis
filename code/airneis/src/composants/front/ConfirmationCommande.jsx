import React, { useContext, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { dataContext } from "../context/dataContext";
import { AuthContext } from "../context/authContext";
import { InfoCommandeContext } from "../context/infoCommandeContext";
import Connexion from "./Connexion";

function ConfirmationCommande() {
  const location = useLocation();
  const { isLoggedIn } = useContext(AuthContext);
  const { panier, nombreProduits, getTotalPanier, getTotalProduit, reinitialiserPanier } = useContext(dataContext);
  const { adresseLivraison, adresseFacturation, Paiement, reinitialiserCommande } = useContext(InfoCommandeContext);

  useEffect(() => {
    return () => {
      reinitialiserPanier();
      reinitialiserCommande();
    };
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <>
          {panier.length === 0 ? (
            <>
            <center>
              <p>Votre panier est vide. ☹️</p>
              <NavLink to="/recherche" className="btn btn-success">
                Voir notre catalogue
              </NavLink>
            </center>
          </>
          ) : (
            <>
              <h1 className="mb-4 text-center">Votre commande  <NavLink to="/mesCommandes"> n°{Paiement.idCommande} </NavLink>est confirmée! ✅</h1>
              <div className="rounded Min-heightConteinerPanier">
                <div className="shadow p-1 mb-1 bg-body rounded divArticles">

                  <table className="table">
                    <tbody className="vertical-align">
                      {panier.map((produit) => {
                        return (
                          <tr key={produit.id}>
                            <td>
                              <img
                                className="rounded"
                                width={150}
                                src={`http://airneis.ddns.net:3000/img_produit/${produit.id}`}
                                alt={produit.nom}
                              />
                            </td>

                            <td>
                              <span>{produit.nom}</span>
                            </td>

                            <td>
                              <div style={{ display: "flex", alignItems: "center" }}>
                                <span className="mx-2">{produit.quantite}</span>
                              </div>
                            </td>

                            <td>
                              {new Intl.NumberFormat("fr-FR", {
                                style: "currency",
                                currency: "EUR",
                              }).format(getTotalProduit(produit))}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  
                  <br/>
                  <center>
                    <div>
                      <p>
                        Tarif{" "}
                        {nombreProduits > 1 && `pour (${nombreProduits} articles)`}
                        :&nbsp;
                        {new Intl.NumberFormat("fr-FR", {
                          style: "currency",
                          currency: "EUR",
                        }).format(getTotalPanier())}
                      </p>
                      <p>Livraison: 10€</p>
                      <strong>
                        <h6>
                          Total:{" "}
                          {new Intl.NumberFormat("fr-FR", {
                            style: "currency",
                            currency: "EUR",
                          }).format(getTotalPanier() + 10)}
                        </h6>
                      </strong>
                    </div>
                  </center>
                </div>
                
                <div className="shadow p-1 mb-1 bg-body rounded divPrixArticles">
                  <h4>Adresse de livraison</h4>
                  <h5>{adresseLivraison.nomAdresseLivraison}</h5>
                  Nom: <strong>{adresseLivraison.nomLivraison}</strong><br />
                  Prénom: <strong>{adresseLivraison.prenomLivraison}</strong><br />
                  Adresse: <strong>{adresseLivraison.adresseLivraison}</strong><br />
                  Adresse 2 (Optionnel): <strong>{adresseLivraison.adresseLivraison2}</strong><br />
                  Code postal: <strong>{adresseLivraison.codePostalLivraison}</strong><br />
                  Ville: <strong>{adresseLivraison.villeLivraison}</strong><br />
                  Pays: <strong>{adresseLivraison.paysLivraison}</strong><br />

                  <hr />

                  <h4>Adresse de facturation</h4>
                  Nom: <strong>{adresseFacturation.nomFacturation}</strong><br />
                  Prénom: <strong>{adresseFacturation.prenomFacturation}</strong><br />
                  Adresse: <strong>{adresseFacturation.adresseFacturation}</strong><br />
                  Code postal: <strong>{adresseFacturation.codePostalFacturation}</strong><br />
                  Ville: <strong>{adresseFacturation.villeFacturation}</strong><br />
                  Pays: <strong>{adresseFacturation.paysFacturation}</strong><br />

                  <hr />

                  <h4>Moyen de paiement</h4>
                  Nom sur la carte: <strong>{Paiement.nomPaiement}</strong><br />
                  Numéro de carte: <strong><span>{'**** **** **** ' + Paiement.numeroPaiement.slice(-4)}</span></strong><br />
                  Date d'expiration: <strong>{Paiement.datePaiement}</strong><br />
                  CVV: <strong>***</strong><br />
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <NavLink to='/Recherche'>
                  <button className="btn-continuer">Continuer mes achats</button>
                </NavLink>
              </div>
            </>
          )}
        </>
        ) : (
          <>
            <Connexion previousLocation={location.pathname} />
          </>
        )}
    </>
  );
};

export default ConfirmationCommande;
