import React, { useState, useContext, useEffect, useRef } from "react";
import { dataContext } from "../context/dataContext";
import { AuthContext } from "../context/authContext";
import { InfoCommandeContext } from "../context/infoCommandeContext";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import axios from "axios";
import Connexion from "./Connexion";
import { useAlert } from "../front/alert/useAlert";
import Alert from "../front/alert/Alert";
import { verifPaiement } from "./verif/VerifPaiement";

const Paiement = () => {
  const { panier, nombreProduits, getTotalPanier, getTotalProduit } = useContext(dataContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState("");
  const { adresseLivraison, adresseFacturation, moyenPaiement } = useContext(InfoCommandeContext);
  const [loading, setLoading] = useState(true);
  const { accountId, isLoggedIn } = useContext(AuthContext);
  const [accountPaiement, setAccountPaiement] = useState([]);
  const [successMessagePaiement, setSuccessMessagePaiement] = useState(null);
  const [selectedPaiementId, setSelectedPaiementId] = useState("");
  const [editModePaiement, setEditModePaiement] = useState(false);
  const totalPanierString = getTotalPanier().toString();
  const [alerte , setAlerte , getError] = useAlert(verifPaiement)
  const [disableButton, setDisableButton] = useState(false);

  const nomPaiementRef = useRef();
  const numeroPaiementRef = useRef();
  const datePaiementRef = useRef();
  const cvvPaiementRef = useRef();

  const handleChangePaiement = (e) => {
    setSelectedPaiementId(e.target.value);
  };

  const produitsCommande = Object.values(panier).map((produit) => ({
    idProduit: produit.id,
    nomProduit: produit.nom,
    prixProduit: produit.prix,
    quantiteProduit: produit.quantite,
  }));

  const handlePayer = async () => {
    if (selectedPaiementId) {
      const selectedPaiement = accountPaiement.find(
        (paiement) => paiement.id === selectedPaiementId
      );
  
      try {
        setDisableButton(true);
        const response = await axios.post('http://airneis.ddns.net:3000/commande.php', {
          accountId,
  
          nomAdresseLivraison: adresseLivraison.nomAdresseLivraison,
          nomLivraison: adresseLivraison.nomLivraison,
          prenomLivraison: adresseLivraison.prenomLivraison,
          adresseLivraison: adresseLivraison.adresseLivraison,
          adresseLivraison2: adresseLivraison.adresseLivraison2,
          codePostalLivraison: adresseLivraison.codePostalLivraison,
          villeLivraison: adresseLivraison.villeLivraison,
          paysLivraison: adresseLivraison.paysLivraison,
  
          nomFacturation: adresseFacturation.nomFacturation,
          prenomFacturation: adresseFacturation.prenomFacturation,
          adresseFacturation: adresseFacturation.adresseFacturation,
          codePostalFacturation: adresseFacturation.codePostalFacturation,
          villeFacturation: adresseFacturation.villeFacturation,
          paysFacturation: adresseFacturation.paysFacturation,
  
          nomPaiement: selectedPaiement.nom,
          numeroPaiement: selectedPaiement.numero,
          datePaiement: selectedPaiement.date,
          cvvPaiement: selectedPaiement.cvv,

          totalProduit: nombreProduits,
          totalPanier: totalPanierString,

          produitsCommande: produitsCommande,
        });
  
        if (response.data.status === 'success') {
          const { commandeId } = response.data;
  
          const Paiement = {
            nomPaiement: selectedPaiement.nom,
            numeroPaiement: selectedPaiement.numero,
            datePaiement: selectedPaiement.date,
            cvvPaiement: selectedPaiement.cvv,
            idCommande: commandeId,
          };
  
          moyenPaiement(Paiement);
          navigate("/ConfirmationCommande");
        } else {
          setErrorMessage(response.data.message);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setDisableButton(false);
      }
    } else {
      setErrorMessage("Veuillez renseigner ou sélectionner un moyen de paiement");
    }
  };

  const [formDataPaiement, setFormDataPaiement] = useState({
    nom: "",
    numero: "",
    date: "",
    cvv: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountRes = await axios.get(`http://airneis.ddns.net:3000/info_paiement.php?accountId=${accountId}`);
        if (accountRes.data.status === "success") {
          setAccountPaiement(accountRes.data.accountPaiement);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, [accountId]);

  const handleInputChangePaiement = (e) => {
    setFormDataPaiement({ ...formDataPaiement, [e.target.name]: e.target.value });
  };

  const handleEditPaiement = () => {
    setEditModePaiement(true);

    const selectedPaiement = accountPaiement.find((paiement) => paiement.id === selectedPaiementId);

    setFormDataPaiement({
      nom: selectedPaiement.nom,
      numero: selectedPaiement.numero,
      date: selectedPaiement.date,
      cvv: selectedPaiement.cvv,
    });
  };

  const handleAjoutPaiement = () => {
    setEditModePaiement(true);
    setSelectedPaiementId("");

    setFormDataPaiement({
      nom: "",
      numero: "",
      date: "",
      cvv: "",
    });
  };

  const handleCancelPaiement = () => {
    setEditModePaiement(false);
  };

  const handleSubmitPaiement = async (e) => {
    e.preventDefault();

    const demande = {
      nomPaiement : JSON.stringify(nomPaiementRef.current.value),
      numeroPaiement : JSON.stringify(numeroPaiementRef.current.value),
      datePaiement : JSON.stringify(datePaiementRef.current.value),
      cvvPaiement : JSON.stringify(cvvPaiementRef.current.value),
    }
    
    if (getError(demande)) {
      return;
    }

    try {
      const response = await axios.post('http://airneis.ddns.net:3000/update_info_paiement.php', {
        accountId,
        id: selectedPaiementId === "" ? null : selectedPaiementId,
        nom: formDataPaiement.nom,
        numero: formDataPaiement.numero,
        date: formDataPaiement.date,
        cvv: formDataPaiement.cvv,
      });
      if (response.data.status === 'success') {
        setEditModePaiement(false);
        const updatedAccountPaiement = accountPaiement.map((paiement) => {
          if (paiement.id === selectedPaiementId) {
            return {
              ...paiement,
              nom: formDataPaiement.nom,
              numero: formDataPaiement.numero,
              date: formDataPaiement.date,
              cvv: formDataPaiement.cvv,
            };
          }
          return paiement;
        });
        setAccountPaiement(updatedAccountPaiement);
        setSuccessMessagePaiement('Les informations de paiement ont été mises à jour avec succès.');
        setTimeout(() => {
          setSuccessMessagePaiement(null);
        }, 2000);
        window.location.href = "/Paiement";
      }
    } catch (error) {}
  };

  const handleDeletePaiement = async () => {
    try {
      await axios.delete(`http://airneis.ddns.net:3000/delete_info_livraison.php?id=${selectedPaiementId}`);
      const updatedAccountPaiement = accountPaiement.filter((paiement) => paiement.id !== selectedPaiementId);
      setAccountPaiement(updatedAccountPaiement);
      setSelectedPaiementId("");
    } catch (error) {
    }
  };

  const handleFocus = () => {
    setAlerte({});
  }

  if (loading) {
    return <div>Chargement...</div>;
  }

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
              {adresseLivraison && adresseFacturation ? (
                <>
                  <h1 className="mb-4 text-center">Paiement</h1>
                  <div className="rounded flex-column Min-heightConteinerPanier">
                    <div className="d-flex align-items-center justify-content-center">
                      <div className="bg-body rounded mb-2 divLivraisonArticles">
                        <h3 className="text-center mb-5">Vos articles sélectionnés</h3>
                        <table className="table">
                          <tbody className="vertical-align">
                            {panier.map((produit) => {
                              return (
                                <tr key={produit.id}>
                                  <td>
                                    <img
                                      className="rounded img-liv"
                                      width={100}
                                      src={`http://airneis.ddns.net:3000/img_produit/${produit.id}`}
                                      alt={produit.nom}
                                    />
                                  </td>

                                  <td>
                                  <span>{produit.nom}</span>
                                  </td>

                                  <td>
                                    <span className="mx-2">{produit.quantite}</span>
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
                        <br />
                        <p>
                          Montant des articles: &nbsp;
                          {new Intl.NumberFormat("fr-FR", {
                            style: "currency",
                            currency: "EUR",
                          }).format(getTotalPanier())}
                        </p>
                        <p>Livraison : 10€</p>
                        <div className="fw-bold TotalPayer ml-2">
                          <h6>
                            Total :{" "}
                            {new Intl.NumberFormat("fr-FR", {
                              style: "currency",
                              currency: "EUR",
                            }).format(getTotalPanier() + 10)}
                          </h6>
                        </div>
                      </div>
                    </div>
                                

                    <div className="mon-compte-container">
                      <div className="sidebar-paiement">
                        <h2 className='text-center'>Moyen de Paiement</h2>
                        {successMessagePaiement && <div className='alert alert-success'>{successMessagePaiement}</div>}
                        <Alert alerte={alerte} />
                        <br />
                        {editModePaiement && (
                          <div>
                            <form onSubmit={handleSubmitPaiement}>
                              <div>
                                <label>Nom sur la carte:</label>
                                <input ref={nomPaiementRef} type='text' name='nom' value={formDataPaiement.nom} onChange={handleInputChangePaiement} onFocus={handleFocus} />
                              </div>
                              <div>
                                <label>Numéro de carte:</label>
                                <input ref={numeroPaiementRef} type='number' inputMode="numeric" name='numero' value={formDataPaiement.numero} onChange={handleInputChangePaiement} onFocus={handleFocus} />
                              </div>
                              <div>
                                <label>Date d’expiration:</label>
                                <input ref={datePaiementRef} type='month' name='date' value={formDataPaiement.date} onChange={handleInputChangePaiement} onFocus={handleFocus} />
                              </div>
                              <div>
                                <label>CVV:</label>
                                <input ref={cvvPaiementRef} type='number' inputMode="numeric" name='cvv' value={formDataPaiement.cvv} onChange={handleInputChangePaiement} onFocus={handleFocus} />
                              </div>
                              <br />
                              <div className='text-center'>
                                <button type='submit' className='btn-custom btn-custom-right'>Enregistrer 💾</button>
                                <button type='button' className='btn-custom btn-custom-right' onClick={handleCancelPaiement}>Annuler ❌</button>
                              </div>
                            </form>
                          </div>
                        )}
                    
                        {!editModePaiement && (
                          <div>
                            <div>
                              <h3>Moyen de paiement</h3>
                              {accountPaiement.length > 0 ? (
                                <div>
                                  <select value={selectedPaiementId} onChange={(e) => handleChangePaiement(e)} className="custom-select-liv">
                                    <option value="">Sélectionner un moyen de Paiement</option>
                                    {accountPaiement.map((paiement) => (
                                      <option key={paiement.id} value={paiement.id}>{paiement.nom}</option>
                                    ))}
                                  </select>
                                  {selectedPaiementId !== "" && (
                                    <div>
                                    <p>Nom sur la carte: <strong>{accountPaiement.find((paiement) => paiement.id === selectedPaiementId).nom}</strong></p>
                                    <p>Numéro de carte: <strong>{"**** **** **** " + accountPaiement.find((paiement) => paiement.id === selectedPaiementId).numero.slice(-4)}</strong></p>
                                    <p>Date d’expiration: <strong>{accountPaiement.find((paiement) => paiement.id === selectedPaiementId).date}</strong></p>
                                    <p>CVV: <strong>{"***"}</strong></p>
                                    <center>
                                      <button type='button' className='btn-custom btn-custom-right' onClick={handleEditPaiement}>Modifier ⚙️</button>
                                      <button type='button' className='btn-custom btn-custom-right' onClick={handleDeletePaiement}>Supprimer ⛒</button>
                                    </center>
                                  </div>
                                )}
                                </div>
                              ) : (
                                <div>
                                <p>Aucun moyen de paiement enregistré</p>
                              </div>
                              )}
                            </div>
                            <br />
                            <center>
                                <button type='button' className='btn-custom' onClick={handleAjoutPaiement}>Ajouter un moyen de paiement</button>
                              </center>
                            <br />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="item-align-center">
                      {errorMessage && (
                        <p className="text-center erreurPanier">{errorMessage}</p>
                      )}
                      <div className="d-flex justify-content-between">
                        <NavLink to='/Livraison' className='btn-custom link-custom my-3'>
                          Retour
                        </NavLink>
                        &emsp;
                        <button className="btn-confirmer" onClick={handlePayer} disabled={disableButton}>
                          Confirmer ma commande
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <center>
                    <p>Erreur aucune adresse de livraison et de facturation sélectionner</p>
                    <NavLink to="/livraison" className="btn btn-success">
                      Retourner à la page de livraison
                    </NavLink>
                  </center>
                </>
              )}
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

export default Paiement;
