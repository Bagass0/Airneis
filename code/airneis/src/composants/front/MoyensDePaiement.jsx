import React, { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/authContext";
import { NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import Connexion from "./Connexion";
import { useAlert } from "../front/alert/useAlert";
import Alert from "../front/alert/Alert";
import { verifPaiement } from "./verif/VerifPaiement";


const MoyenDePaiement = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const { accountId, isLoggedIn } = useContext(AuthContext);
  const [accountPaiement, setAccountPaiement] = useState([]);
  const [successMessagePaiement, setSuccessMessagePaiement] = useState(null);
  const [selectedPaiementId, setSelectedPaiementId] = useState("");
  const [editModePaiement, setEditModePaiement] = useState(false);
  const [alerte , setAlerte , getError] = useAlert(verifPaiement)

  const nomPaiementRef = useRef();
  const numeroPaiementRef = useRef();
  const datePaiementRef = useRef();
  const cvvPaiementRef = useRef();

  const handleChangePaiement = (e) => {
    setSelectedPaiementId(e.target.value);
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
        window.location.reload();
      } else {
      }
    } catch (error) {
    }
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
          <div className="mon-compte-container">
            <div className="sidebar-param">
              <h1 className="sidebar-title">Récapitulatif de votre compte</h1>
              <div>
                <h2 className='text-center'>Moyen de Paiement</h2>
                {successMessagePaiement && <div className='alert alert-success'>{successMessagePaiement}</div>}
                <Alert alerte={alerte} />
                <br />
                <hr />
                {editModePaiement && (
                  <div>
                    <form onSubmit={handleSubmitPaiement}>
                      <div>
                        <label>Nom sur la carte:</label>
                        <input ref={nomPaiementRef} type='text' name='nom' value={formDataPaiement.nom} onChange={handleInputChangePaiement} onFocus={handleFocus} required />
                      </div>
                      <div>
                        <label>Numéro de carte:</label>
                        <input ref={numeroPaiementRef} type='number' inputMode="numeric" name='numero' value={formDataPaiement.numero} onChange={handleInputChangePaiement} onFocus={handleFocus} required />
                      </div>
                      <div>
                        <label>Date d’expiration:</label>
                        <input ref={datePaiementRef} type='month' name='date' value={formDataPaiement.date} onChange={handleInputChangePaiement} onFocus={handleFocus} required />
                      </div>
                      <div>
                        <label>CVV:</label>
                        <input ref={cvvPaiementRef} type='number' name='cvv' value={formDataPaiement.cvv} onChange={handleInputChangePaiement} onFocus={handleFocus} required />
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
                <hr />
                <div className="d-flex">
                <NavLink to='/MesParametres' className='btn-custom link-custom my-3'>
                  Retour
                </NavLink>
              </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Connexion redirection={location} />
      )}
    </>
  );
};

export default MoyenDePaiement;
