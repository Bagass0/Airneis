import React, { useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { NavLink, useLocation } from 'react-router-dom';
import { AuthContext } from "../context/authContext";
import Connexion from "./Connexion";
import { useAlert } from "../front/alert/useAlert";
import { useAlert2 } from "../front/alert/useAlert2";
import { verifLivraison } from "./verif/VerifLivraison";
import { verifFacturation } from "./verif/VerifFacturation";

function UserAdresses() {
  const [loading, setLoading] = useState(true);
  const { accountId, isLoggedIn } = useContext(AuthContext);
  const location = useLocation();
  const [accountInfo, setAccountInfo] = useState([]);
  const [accountFac, setAccountFac] = useState({});
  const [editModeLivraison, setEditModeLivraison] = useState(false);
  const [alerte, setAlerte, getError] = useAlert(verifLivraison);
  const [alerte2, setAlerte2, getError2] = useAlert2(verifFacturation);

  const nomAdresseLivraisonRef = useRef();
  const nomLivraisonRef = useRef();
  const prenomLivraisonRef = useRef();
  const adresseLivraisonRef = useRef();
  const adresse2LivraisonRef = useRef();
  const codePostalLivraisonRef = useRef();
  const villeLivraisonRef = useRef();
  const paysLivraisonRef = useRef();

  const nomFacturationRef = useRef();
  const prenomFacturationRef = useRef();
  const adresseFacturationRef = useRef();
  const codePostalFacturationRef = useRef();
  const villeFacturationRef = useRef();
  const paysFacturationRef = useRef();

  const handleFocus = () => {
    setAlerte({});
  }

  const handleFocus2 = () => {
    setAlerte2({});
  }

  const AlertComponent = ({ alerte, alerte2 }) => {
    const [visibleAlerte, setVisibleAlerte] = useState(true);
    const [visibleAlerte2, setVisibleAlerte2] = useState(true);
  
    useEffect(() => {
      const timer1 = setTimeout(() => {
        setVisibleAlerte(false);
      }, 10000);
  
      const timer2 = setTimeout(() => {
        setVisibleAlerte2(false);
      }, 10000);
  
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }, []);
  
    return (
      <>
        {Object.keys(alerte).length > 0 && visibleAlerte && (
          <div className={`alert alert-${alerte.type} mt-3`}>
            {alerte.liste.map((a, index) => {
              return <div key={index}>{a}</div>;
            })}
          </div>
        )}
        {Object.keys(alerte2).length > 0 && visibleAlerte2 && (
          <div className={`alert alert-${alerte2.type} mt-3`}>
            {alerte2.liste.map((a, index) => {
              return <div key={index}>{a}</div>;
            })}
          </div>
        )}
      </>
    );
  };

  const [formDataLivraison, setFormDataLivraison] = useState({
    nomAdresse: '',
    nom: '',
    prenom: '',
    adresseLivraison: '',
    adresseLivraison2: '',
    codePostalLivraison: '',
    villeLivraison: '',
    pays: '',
  });
  const [editModeFacturation, setEditModeFacturation] = useState(false);
  const [formDataFacturation, setFormDataFacturation] = useState({
    nomFacturation:'',
    prenomFacturation:'',
    adresseFacturation: '',
    codePostalFacturation: '',
    villeFacturation: '',
    paysFacturation: '',
  });

  const [successMessageLivraison, setSuccessMessageLivraison] = useState(null);
  const [successMessageFacturation, setSuccessMessageFacturation] = useState(null);
  const [selectedAdresseId, setSelectedAdresseId] = useState(""); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountRes = await axios.get(`http://airneis.ddns.net:3000/info_livraison.php?accountId=${accountId}`);
        if (accountRes.data.status === 'success') {
          setAccountInfo(accountRes.data.accountLivraisons);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountRes = await axios.get(`http://airneis.ddns.net:3000/info_facturation.php?accountId=${accountId}`);
        if (accountRes.data.status === 'success') {
          setAccountFac(accountRes.data.accountLivraison);
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

  const handleInputChangeLivraison = (e) => {
    setFormDataLivraison({ ...formDataLivraison, [e.target.name]: e.target.value });
  };

  const handleInputChangeFacturation = (e) => {
    setFormDataFacturation({ ...formDataFacturation, [e.target.name]: e.target.value });
  };

  const handleEditLivraison = () => {
    setEditModeLivraison(true);
    setEditModeFacturation(false);
  
    const selectedAdresse = accountInfo.find((adresse) => adresse.id === selectedAdresseId);
  
    setFormDataLivraison({
      nomAdresse: selectedAdresse.nom_adresse,
      nom: selectedAdresse.nom,
      prenom: selectedAdresse.prenom,
      adresseLivraison: selectedAdresse.adresse1,
      adresseLivraison2: selectedAdresse.adresse2,
      codePostalLivraison: selectedAdresse.code_postal,
      villeLivraison: selectedAdresse.ville,
      pays: selectedAdresse.pays,
    });
  
    setFormDataFacturation({
      nomFacturation: '',
      prenomFacturation: '',
      adresseFacturation: '',
      codePostalFacturation: '',
      villeFacturation: '',
      paysFacturation: '',
    });
  };

  const handleAjoutLivraison = () => {
    setEditModeLivraison(true);
    setEditModeFacturation(false);
    setSelectedAdresseId("");
  
    const selectedAdresse = accountInfo.find((adresse) => adresse.id === selectedAdresseId);
  
    setFormDataLivraison({
      nomAdresse: '',
      nom: '',
      prenom: '',
      adresseLivraison: '',
      adresseLivraison2: '',
      codePostalLivraison: '',
      villeLivraison: '',
      pays: '',
    });
  
    setFormDataFacturation({
      nomFacturation: '',
      prenomFacturation: '',
      adresseFacturation: '',
      codePostalFacturation: '',
      villeFacturation: '',
      paysFacturation: '',
    });
  };
  
  const handleEditFacturation = () => {
    setEditModeFacturation(true);
    setEditModeLivraison(false);
  
    setFormDataLivraison({
      nomAdresse: '',
      nom: '',
      prenom: '',
      adresseLivraison: '',
      adresseLivraison2: '',
      codePostalLivraison: '',
      villeLivraison: '',
      pays: '',
    });
  
    setFormDataFacturation({
      nomFacturation: accountFac.nom_facturation,
      prenomFacturation: accountFac.prenom_facturation,
      adresseFacturation: accountFac.adresse_facturation,
      codePostalFacturation: accountFac.code_postal_facturation,
      villeFacturation: accountFac.ville_facturation,
      paysFacturation: accountFac.pays_facturation,
    });
  };

  const handleCancelLivraison = () => {
    setEditModeLivraison(false);
  };

  const handleCancelFacturation = () => {
    setEditModeFacturation(false);
  };

  const handleSubmitLivraison = async (e) => {
    e.preventDefault();
  
    const demande = {
      nomAdresseLivraison : JSON.stringify(nomAdresseLivraisonRef.current.value),
      nomLivraison : JSON.stringify(nomLivraisonRef.current.value),
      prenomLivraison : JSON.stringify(prenomLivraisonRef.current.value),
      adresseLivraison : JSON.stringify(adresseLivraisonRef.current.value),
      adresse2Livraison : JSON.stringify(adresse2LivraisonRef.current.value),
      codePostalLivraison : JSON.stringify(codePostalLivraisonRef.current.value),
      villeLivraison : JSON.stringify(villeLivraisonRef.current.value),
      paysLivraison : JSON.stringify(paysLivraisonRef.current.value),
    }
    
    if (getError(demande)) {
      return;
    }

    try {
      const response = await axios.post('http://airneis.ddns.net:3000/update_info_livraison.php', {
        accountId,
        id: selectedAdresseId === "" ? null : selectedAdresseId,
        nomAdresse: formDataLivraison.nomAdresse,
        nom: formDataLivraison.nom,
        prenom: formDataLivraison.prenom,
        adresseLivraison: formDataLivraison.adresseLivraison,
        adresseLivraison2: formDataLivraison.adresseLivraison2,
        codePostalLivraison: formDataLivraison.codePostalLivraison,
        villeLivraison: formDataLivraison.villeLivraison,
        pays: formDataLivraison.pays,
      });
      if (response.data.status === 'success') {
        setEditModeLivraison(false);
        const updatedAccountInfo = accountInfo.map((adresse) => {
          if (adresse.id === selectedAdresseId) {
            return {
              ...adresse,
              nom_adresse: formDataLivraison.nomAdresse,
              nom: formDataLivraison.nom,
              prenom: formDataLivraison.prenom,
              adresse1: formDataLivraison.adresseLivraison,
              adresse2: formDataLivraison.adresseLivraison2,
              code_postal: formDataLivraison.codePostalLivraison,
              ville: formDataLivraison.villeLivraison,
              pays: formDataLivraison.pays,
            };
          }
          return adresse;
        });
        setAccountInfo(updatedAccountInfo);
        setSuccessMessageLivraison('Les informations de livraison ont été mises à jour avec succès.');
        setTimeout(() => {
          setSuccessMessageLivraison(null);
        }, 3000);
        
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
      }
    } catch (error) {
    }
  };

  const handleSubmitFacturation = async (e) => {
    e.preventDefault();

    const demande = {
      nomFacturation : JSON.stringify(nomFacturationRef.current.value),
      prenomFacturation : JSON.stringify(prenomFacturationRef.current.value),
      adresseFacturation : JSON.stringify(adresseFacturationRef.current.value),
      codePostalFacturation : JSON.stringify(codePostalFacturationRef.current.value),
      villeFacturation : JSON.stringify(villeFacturationRef.current.value),
      paysFacturation : JSON.stringify(paysFacturationRef.current.value),
    }
    
    if (getError2(demande)) {
      return;
    }

    try {
      const response = await axios.post('http://airneis.ddns.net:3000/update_info_facturation.php', {
        accountId,
        nomFacturation: formDataFacturation.nomFacturation,
        prenomFacturation: formDataFacturation.prenomFacturation,
        adresseFacturation: formDataFacturation.adresseFacturation,
        codePostalFacturation: formDataFacturation.codePostalFacturation,
        villeFacturation: formDataFacturation.villeFacturation,
        paysFacturation: formDataFacturation.paysFacturation,
      });
      if (response.data.status === 'success') {
        setEditModeFacturation(false);
        setAccountFac({
          ...accountFac,
          nom_facturation: formDataFacturation.nomFacturation,
          prenom_facturation: formDataFacturation.prenomFacturation,
          adresse_facturation: formDataFacturation.adresseFacturation,
          code_postal_facturation: formDataFacturation.codePostalFacturation,
          ville_facturation: formDataFacturation.villeFacturation,
          pays_facturation: formDataFacturation.paysFacturation,
        });
        setSuccessMessageFacturation('Les informations de facturation ont été mises à jour avec succès.');
        setTimeout(() => {
          setSuccessMessageFacturation(null);
        }, 2000);
      } else {
      }
    } catch (error) {
    }
  };

  const handleDeleteFacturation = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://airneis.ddns.net:3000/update_info_facturation.php', {
        accountId,
        nomFacturation: '',
        prenomFacturation: '',
        adresseFacturation: '',
        codePostalFacturation: null,
        villeFacturation: '',
        paysFacturation: '',
      });
      if (response.data.status === 'success') {
        setEditModeFacturation(false);
        setAccountFac({
          ...accountFac,
          nom_facturation: formDataFacturation.nomFacturation,
          prenom_facturation: formDataFacturation.prenomFacturation,
          adresse_facturation: formDataFacturation.adresseFacturation,
          code_postal_facturation: formDataFacturation.codePostalFacturation,
          ville_facturation: formDataFacturation.villeFacturation,
          pays_facturation: formDataFacturation.paysFacturation,
        });
        setSuccessMessageFacturation('Les informations de facturation ont été mises à jour avec succès.');
        setTimeout(() => {
          setSuccessMessageFacturation(null);
        }, 2000);
      } else {
      }
    } catch (error) {
    }
  };

  const handleDeleteAdresse = async () => {
    try {
      await axios.delete(`http://airneis.ddns.net:3000/delete_info_livraison.php?id=${selectedAdresseId}`);
      const updatedAccountInfo = accountInfo.filter((adresse) => adresse.id !== selectedAdresseId);
      setAccountInfo(updatedAccountInfo);
      setSelectedAdresseId("");
    } catch (error) {
    }
  };
  

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <>
      {isLoggedIn ? (

        <div className="mon-compte-container">
          <div className="sidebar-param">
            <h1 className="sidebar-title">Récapitulatif de votre compte</h1>
            <div>
              <h2 className='text-center'>Carnet d'adresses</h2>
              {successMessageLivraison && <div className='alert alert-success'>{successMessageLivraison}</div>}
              {successMessageFacturation && <div className='alert alert-success'>{successMessageFacturation}</div>}
              <AlertComponent alerte={alerte} alerte2={alerte2} />
              <br />
              <hr />
              {editModeLivraison && (
                <div>
                  <h3>Adresse de livraison</h3>
                  <form onSubmit={handleSubmitLivraison}>
                    <div>
                      <label>Nom de l'adresse:</label>
                      <input ref={nomAdresseLivraisonRef} type='text' name='nomAdresse' value={formDataLivraison.nomAdresse} onChange={handleInputChangeLivraison} onFocus={handleFocus} required />
                    </div>
                    <div>
                      <label>Nom:</label>
                      <input ref={nomLivraisonRef} type='text' name='nom' value={formDataLivraison.nom} onChange={handleInputChangeLivraison} onFocus={handleFocus} required />
                    </div>
                    <div>
                      <label>Prénom:</label>
                      <input ref={prenomLivraisonRef} type='text' name='prenom' value={formDataLivraison.prenom} onChange={handleInputChangeLivraison} onFocus={handleFocus} required />
                    </div>
                    <div>
                      <label>Adresse:</label>
                      <input ref={adresseLivraisonRef} type='text' name='adresseLivraison' value={formDataLivraison.adresseLivraison} onChange={handleInputChangeLivraison} onFocus={handleFocus} required />
                    </div>
                    <div>
                      <label>Adresse 2 (optionnel):</label>
                      <input ref={adresse2LivraisonRef} type='text' name='adresseLivraison2' value={formDataLivraison.adresseLivraison2} onChange={handleInputChangeLivraison} onFocus={handleFocus}/>
                    </div>
                    <div>
                      <label>Code postal:</label>
                      <input ref={codePostalLivraisonRef} type='text' name='codePostalLivraison' value={formDataLivraison.codePostalLivraison} onChange={handleInputChangeLivraison} onFocus={handleFocus} required />
                    </div>
                    <div>
                      <label>Ville:</label>
                      <input ref={villeLivraisonRef} type='text' name='villeLivraison' value={formDataLivraison.villeLivraison} onChange={handleInputChangeLivraison} onFocus={handleFocus} required />
                    </div>
                    <div>
                      <label>Pays:</label>
                      <input ref={paysLivraisonRef} type='text' name='pays' value={formDataLivraison.pays} onChange={handleInputChangeLivraison} onFocus={handleFocus} required />
                    </div>
                    <br />
                    <div className='text-center'>
                      <button type='submit' className='btn-custom btn-custom-right'>Enregistrer 💾</button>
                      <button type='button' className='btn-custom btn-custom-right' onClick={handleCancelLivraison}>Annuler ❌</button>
                    </div>
                  </form>
                </div>
              )}
              {editModeFacturation && (
                <div>
                  <h3>Adresse de facturation</h3>
                  <form onSubmit={handleSubmitFacturation}>
                    <div>
                      <label>Nom:</label>
                      <input ref={nomFacturationRef} type='text' name='nomFacturation' value={formDataFacturation.nomFacturation} onChange={handleInputChangeFacturation} onFocus={handleFocus2} required />
                    </div>
                    <div>
                      <label>Prénom:</label>
                      <input ref={prenomFacturationRef} type='text' name='prenomFacturation' value={formDataFacturation.prenomFacturation} onChange={handleInputChangeFacturation} onFocus={handleFocus2} required />
                    </div>
                    <div>
                      <label>Adresse:</label>
                      <input ref={adresseFacturationRef} type='text' name='adresseFacturation' value={formDataFacturation.adresseFacturation} onChange={handleInputChangeFacturation} onFocus={handleFocus2} required />
                    </div>
                    <div>
                      <label>Code postal:</label>
                      <input ref={codePostalFacturationRef} type='text' name='codePostalFacturation' value={formDataFacturation.codePostalFacturation} onChange={handleInputChangeFacturation} onFocus={handleFocus2} required />
                    </div>
                    <div>
                      <label>Ville:</label>
                      <input ref={villeFacturationRef} type='text' name='villeFacturation' value={formDataFacturation.villeFacturation} onChange={handleInputChangeFacturation} onFocus={handleFocus2} required />
                    </div>
                    <div>
                      <label>Pays:</label>
                      <input ref={paysFacturationRef} type='text' name='paysFacturation' value={formDataFacturation.paysFacturation} onChange={handleInputChangeFacturation} onFocus={handleFocus2} required />
                    </div>
                    <br />
                    <div className='text-center'>
                      <button type='submit' className='btn-custom btn-custom-right'>Enregistrer 💾</button>
                      <button type='button' className='btn-custom btn-custom-right' onClick={handleCancelFacturation}>Annuler ❌</button>
                    </div>
                  </form>
                </div>
              )}
              {!editModeLivraison && !editModeFacturation && (
                <div>
                  <div>
                    <h3>Adresse de livraison</h3>
                    {accountInfo.length > 0 ? (
                      <div>
                          <select value={selectedAdresseId} onChange={(e) => setSelectedAdresseId(e.target.value)} className="custom-select">
                            <option value="">Sélectionner une adresse</option>
                            {accountInfo.map((adresse) => (
                            <option key={adresse.id} value={adresse.id}>{adresse.nom_adresse}</option>
                             ))}
                            </select>
                        {selectedAdresseId !== "" && (
                          <div className="adresse-container">
                            <p>Nom de l'adresse: <strong>{accountInfo.find((adresse) => adresse.id === selectedAdresseId).nom_adresse} </strong></p>
                            <p>Nom: <strong>{accountInfo.find((adresse) => adresse.id === selectedAdresseId).nom}</strong> </p>
                            <p>Prénom: <strong>{accountInfo.find((adresse) => adresse.id === selectedAdresseId).prenom}</strong></p>
                            <p>Adresse: <strong>{accountInfo.find((adresse) => adresse.id === selectedAdresseId).adresse1}</strong></p>
                            <p>Adresse 2: <strong>{accountInfo.find((adresse) => adresse.id === selectedAdresseId).adresse2}</strong></p>
                            <p>Code postal:<strong> {accountInfo.find((adresse) => adresse.id === selectedAdresseId).code_postal}</strong></p>
                            <p>Ville: <strong>{accountInfo.find((adresse) => adresse.id === selectedAdresseId).ville}</strong></p>
                            <p>Pays: <strong>{accountInfo.find((adresse) => adresse.id === selectedAdresseId).pays}</strong></p>
                            <center>
                              <button type='button' className='btn-custom btn-custom-right' onClick={handleEditLivraison}>Modifier ⚙️</button>
                              <button type='button' className='btn-custom btn-custom-right' onClick={handleDeleteAdresse}>Supprimer ⛒</button>
                            </center>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                      <p>Aucune adresse de livraison enregistrée</p>
                    </div>
                    )}
                  </div>
                  <center>
                    <br />
                        <button type='button' className='btn-custom' onClick={handleAjoutLivraison}>Ajouter une adresse de livraison</button>
                      </center>
                      
                  <br />
                  <div>
                    <hr />
                    <h3>Adresse de facturation</h3>
                    {accountFac.nom_facturation || accountFac.prenom_facturation || accountFac.pays_facturation || accountFac.adresse_facturation || accountFac.code_postal_facturation || accountFac.ville_facturation ? (
                      <div>
                      <p>Nom: <strong>{accountFac.nom_facturation}</strong></p>
                      <p>Prénom: <strong>{accountFac.prenom_facturation}</strong></p>
                      <p>Adresse: <strong>{accountFac.adresse_facturation}</strong></p>
                      <p>Code postal: <strong>{accountFac.code_postal_facturation}</strong></p>
                      <p>Ville: <strong>{accountFac.ville_facturation}</strong></p>
                      <p>Pays: <strong>{accountFac.pays_facturation}</strong></p>
                      <center>
                        <div className='d-flex justify-content-center'>
                        <button type='button' className='btn-custom btn-custom-right' onClick={handleEditFacturation}>Modifier ⚙️</button>
                        <button type='button' className='btn-custom btn-custom-right' onClick={handleDeleteFacturation}>Supprimer ⛒</button>
                        </div>
                      </center>
                    </div>
                    ) : (
                      <div>
                      <p>Aucune adresse de facturation enregistrée.</p>
                      <center>
                        <button type='button' className='btn-custom align-item-center' onClick={handleEditFacturation}>Ajouter une adresse de facturation</button>
                      </center>
                    </div>
                    )}
                  </div>
                </div>
              )}
              <br />
              <hr />
              <div className="d-flex">
                <NavLink to='/MesParametres' className='btn-custom link-custom my-3'>
                  Retour
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        ) : (
          <>
            <Connexion previousLocation={location.pathname} />
          </>
        )}
    </>
  );
}

export default UserAdresses;
