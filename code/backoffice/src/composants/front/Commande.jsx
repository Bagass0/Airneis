import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import Connexion from "./Connexion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const getSalesData = (commandes, periode) => {
  let data = [];
  const today = new Date();
  const endDate = today;
  let startDate;

  if (periode === 'jour') {
    startDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  } else if (periode === 'semaine') {
    startDate = new Date(today.getTime() - 5 * 7 * 24 * 60 * 60 * 1000);
  }

  const dateLabels = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dateLabels.push(currentDate.toLocaleDateString());
    if (periode === 'jour') {
      currentDate.setDate(currentDate.getDate() + 1);
    } else if (periode === 'semaine') {
      currentDate.setDate(currentDate.getDate() + 7);
    }
  }

  data = dateLabels.map((dateLabel) => {
    const filteredCommandes = commandes.filter((commande) => {
      const commandeDate = new Date(commande.date);
      return (
        commandeDate.toLocaleDateString() === dateLabel ||
        (periode === 'semaine' &&
          commandeDate >= new Date(dateLabel) &&
          commandeDate <= new Date(dateLabel).getTime() + 7 * 24 * 60 * 60 * 1000)
      );
    });

    const total = filteredCommandes.reduce((acc, cur) => acc + parseFloat(cur.total_panier), 0);

    return {
      date: dateLabel,
      total: total.toFixed(2),
    };
  });

  return data;
};


function Commande() {
  const { isLoggedIn } = useContext(AuthContext);
  const [commandes, setCommandes] = useState([]);
  const [commandeSelectionnee, setCommandeSelectionnee] = useState(null);
  const [periode, setPeriode] = useState('jour');
  const salesData = getSalesData(commandes, periode);

  useEffect(() => {
    axios.get(`http://airneis.ddns.net:3000/commande_back.php`)
      .then(response => {
        const commandesTrie = response.data.sort((a, b) => new Date(a.date_commande) - new Date(b.date_commande));
        setCommandes(commandesTrie);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des commandes", error);
      });
  }, []);

  const handleClick = (commande) => {
    if (commandeSelectionnee === commande) {
      setCommandeSelectionnee(null);
    } else {
      setCommandeSelectionnee(commande);
    }
  };

  const handleExpédié = async (commande) => {
    const confirmation = window.confirm("Êtes-vous sûr de vouloir expédier cette commande ?");
    if (confirmation) {
      axios.post(`http://airneis.ddns.net:3000/expedier_commande.php`, { id: commande.id })
        .then(response => {
          const updatedCommandes = commandes.map(c => {
            if (c.id === commande.id) {
              return { ...c, etat: 'Expédiée' };
            }
            return c;
          });
          setCommandes(updatedCommandes);
        })
        .catch(error => {
          console.error("Erreur lors de l'expédition de la commande", error);
        });
    }
  };

  const handleAnnulée = async (commande) => {
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
              <br />
              <p>Aucune commande passée pour le moment ☹️</p>
            </center>
          ) : (
            <>
              <h1 style={{ textAlign: 'center' }}>Gestion des commandes</h1>

              <br />
              <center>
                <div>
                  Période :
                  <select value={periode} onChange={(e) => setPeriode(e.target.value)}>
                    <option value="jour">Par jour</option>
                    <option value="semaine">Par semaine</option>
                  </select>
                </div>

                <BarChart width={600} height={300} data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" fill="#8884d8" />
                </BarChart>
              </center>

              <br />
              <hr/>
              <br />

              <p style={{ marginLeft: '100px', fontSize: '40px', fontWeight: 'bold' }}>
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
                          <div>
                            <h4>Commande n° {commande.id} - État : <span style={{ color: 'orange' }}>{commande.etat}</span></h4>
                            <button className="btn btn-warning" onClick={() => handleExpédié(commande)}>Expédier la commande</button>
                            &nbsp; &nbsp;
                            <button className="btn btn-danger" onClick={() => handleAnnulée(commande)}>Annuler la commande</button>
                          </div>
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
                                  <img
                                    className="rounded img-liv"
                                    width={75}
                                    src={`http://airneis.ddns.net:3000/img_produit/${produit.id_produit}`}
                                    alt={produit.nom}
                                  />
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
        <Connexion/>
      )}
    </>
  );
}

export default Commande;