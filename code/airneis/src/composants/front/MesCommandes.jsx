import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import axios from 'axios';
import { useLocation, NavLink, Link } from "react-router-dom";
import Connexion from "./Connexion";

function MesCommandes() {
  const { accountId, isLoggedIn } = useContext(AuthContext);
  const [commandes, setCommandes] = useState([]);
  const [commandeSelectionnee, setCommandeSelectionnee] = useState(null);
  const location = useLocation();

  useEffect(() => {
    axios.get(`http://airneis.ddns.net:3000/page-mes-commandes.php?accountId=${accountId}`)
      .then(response => {
        const commandesTrie = response.data.sort((a, b) => b.id - a.id);
        setCommandes(commandesTrie);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des commandes", error);
      });
  }, [accountId]);

  const handleClick = (commande) => {
    if (commandeSelectionnee === commande) {
      setCommandeSelectionnee(null);
    } else {
      setCommandeSelectionnee(commande);
    }
  };

  const annulerCommande = (commande) => {
    const confirmation = window.confirm("Êtes-vous sûr de vouloir annuler cette commande ?");
    if (confirmation) {
      axios.post(`http://airneis.ddns.net:3000/annuler-commande.php`, { id: commande.id })
        .then(response => {
          const updatedCommandes = commandes.map(c => {
            if (c.id === commande.id) {
              return { ...c, etat: 'Annulé' };
            }
            return c;
          });
          setCommandes(updatedCommandes);
        })
        .catch(error => {
          console.error("Erreur lors de l'annulation de la commande", error);
        });
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          {commandes.length === 0 ? (
            <center>
              <p>Aucune commande passée pour le moment ☹️</p>
              <NavLink to="/recherche" className="btn btn-success">
                Voir notre catalogue
              </NavLink>
            </center>
          ) : (
            <>
              <h1 style={{ textAlign: 'center' }}>Mes commandes</h1>
              <p style={{ marginLeft: '100px', fontSize: '30px', fontWeight: 'bold' }}>
                Année : {new Date().getFullYear()}
              </p>
              <br />
              <div className="mes-commandes">
                {commandes.map((commande) => {
                  const prixTotalAvecLivraison = parseFloat(commande.total_panier) + 10;

                  return (
                    <div key={commande.id} className={`commande-item ${commandeSelectionnee === commande ? 'commande-selected' : ''}`}>
                      <div className={`bouton-commandes ${commande.etat.toLowerCase()}`} onClick={() => handleClick(commande)}>
                        {commande.etat === 'En cours de préparation' && (
                          <>
                            <h4>Commande n° {commande.id} - État : <span style={{ color: 'orange' }}>{commande.etat}</span></h4>
                            <button className="annuler-commande" onClick={() => annulerCommande(commande)}>Annuler la commande</button>
                          </>
                        )}
                        {commande.etat === 'Expédiée' && (
                          <h4>Commande n° {commande.id} - État : <span style={{ color: 'green' }}>{commande.etat}</span></h4>
                        )}
                        {commande.etat === 'Annulé' && (
                          <h4>Commande n° {commande.id} - État : <span style={{ color: 'red' }}>{commande.etat}</span></h4>
                        )}
                      </div>
                      {commandeSelectionnee === commande && (
                        <div className="commande-details">
                          <div>
                            <h2>Détails de la commande</h2>
                            <h4>État : {commande.etat} </h4>
                            <h5>Commandé le : {commande.date}</h5>
                            <h6>Nombre d'articles : {commande.total_produit}</h6>
                            <h6>Prix total (avec livraison) : {prixTotalAvecLivraison}€</h6>
                            <hr />
                            <h4>Articles :</h4>
                            <ul>
                              {commande.produits.map((produit) => (
                                <li key={produit.id}>
                                  <Link to={`/Produit/${produit.id_produit}`}>
                                  <img
                                    className="rounded img-liv"
                                    width={75}
                                    src={`http://airneis.ddns.net:3000/img_produit/${produit.id_produit}`}
                                    alt={produit.nom}
                                  />
                                  </Link>
                                  &nbsp; {produit.nom_produit} - Prix : {produit.prix_produit}€ - Quantité : {produit.quantite_produit}
                                </li>
                              ))}
                            </ul>
                            <hr />
                            <h4>Adresse de livraison</h4>
                            <h5>{commande.nom_adresse_livraison}</h5>
                            Nom: <strong>{commande.nom_livraison}</strong><br />
                            Prénom: <strong>{commande.prenom_livraison}</strong><br />
                            Adresse: <strong>{commande.adresse_livraison}</strong><br />
                            Adresse 2 (Optionnel): <strong>{commande.adresse_livraison2}</strong><br />
                            Code postal: <strong>{commande.code_postal_livraison}</strong><br />
                            Ville: <strong>{commande.ville_livraison}</strong><br />
                            Pays: <strong>{commande.pays_livraison}</strong><br />

                            <hr />

                            <h4>Adresse de facturation</h4>
                            Nom: <strong>{commande.nom_facturation}</strong><br />
                            Prénom: <strong>{commande.prenom_facturation}</strong><br />
                            Adresse: <strong>{commande.adresse_facturation}</strong><br />
                            Code postal: <strong>{commande.code_postal_facturation}</strong><br />
                            Ville: <strong>{commande.ville_facturation}</strong><br />
                            Pays: <strong>{commande.pays_facturation}</strong><br />

                            <hr />

                            <h4>Moyen de paiement</h4>
                            Nom sur la carte: <strong>{commande.nom_paiement}</strong><br />
                            Numéro de carte: <strong><span>{'**** **** **** ' + commande.numero_paiement.slice(-4)}</span></strong><br />
                            Date d'expiration: <strong>{commande.date_paiement}</strong><br />
                            CVV: <strong>***</strong><br />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </>
      ) : (
        <Connexion redirection={location} />
      )}
    </>
  );
}

export default MesCommandes;
