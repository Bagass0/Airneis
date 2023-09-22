import { AuthContext } from "../context/authContext";
import React, { useContext, useState, useEffect, useRef, forwardRef  } from "react";
import Connexion from "./Connexion";
import axios from "axios";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { useAlert } from "../front/alert/useAlert";
import Alert from "../front/alert/Alert";
import { verifMotDePasse } from "./verif/VerifMotDePasse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function MesParametres() {
  const { isLoggedIn, accountId, accountInfo } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [alerte , setAlerte , getError] = useAlert(verifMotDePasse)

  const motDePasseRef = useRef();

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleEditPassword = () => {
    setIsEditMode(true);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
  };

  const handleAddresses = () => {
    setIsEditMode(false);
    navigate("/userAdresses");
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();

    const demande = {
      motDePasse : JSON.stringify(motDePasseRef.current.value),
    }
    
    if (getError(demande)) {
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas");
    } else if (
      oldPassword === "" ||
      newPassword === "" ||
      confirmPassword === ""
    ) {
      setPasswordError("Veuillez remplir tous les champs");
    } else {
      try {
        const response = await axios.post(
          "http://airneis.ddns.net:3000/edit-password.php",
          {
            accountId,
            isLoggedIn: isLoggedIn,
            oldPassword,
            newPassword,
          }
        );
        if (response.data.status === "success") {
          alert("Mot de passe modifié avec succès");
          setIsEditMode(false);
          setPasswordError("");
        } else {
          setPasswordError(response.data.message);
        }
      } catch (error) {
      }
    }
  };
  const handleChangeOldPassword = (e) => {
    setOldPassword(e.target.value);
  };

  const handleChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleFocus = () => {
    setAlerte({});
  }

  return (
    <>
      {isLoggedIn ? (
        <div className="mon-compte-container">
          <div className="sidebar-param">
            <h1 className="sidebar-title">Récapitulatif de votre compte</h1>
            <hr />
            <Alert alerte={alerte} />
            {isEditMode ? (
              <form onSubmit={handleSubmitPassword}>
                <div className="form-group">
                  <label className="label-mdp">Ancien mot de passe:</label>
                  <div className="password-input">
                    <input
                      ref={motDePasseRef}
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      value={oldPassword}
                      onChange={handleChangeOldPassword}
                      onFocus={handleFocus}
                      required
                    />
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye}
                      className="password-icon"
                      onClick={toggleShowPassword}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="label-mdp">Nouveau mot de passe:</label>
                  <div className="password-input">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      ref={motDePasseRef}
                      value={newPassword}
                      onChange={handleChangeNewPassword}
                      onFocus={handleFocus}
                      required
                    />
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye}
                      className="password-icon"
                      onClick={toggleShowPassword}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="label-mdp">
                    Répéter le nouveau mot de passe:
                  </label>
                  <div className="password-input">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      ref={motDePasseRef}
                      value={confirmPassword}
                      onChange={handleChangeConfirmPassword}
                      onFocus={handleFocus}
                      required
                    />
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye}
                      className="password-icon"
                      onClick={toggleShowPassword}
                    />
                  </div>
                </div>
                {passwordError && (
                  <p className="error-message">{passwordError}</p>
                )}
                <div className="button-group">
                  <button type="submit" className="btn-custom">
                    Valider ✔️
                  </button>
                  <button
                    className="btn-custom"
                    onClick={() => setIsEditMode(false)}
                  >
                    Annuler ❌
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="form-group">
                  <label className="label-nom">Nom:</label>
                  <p className="form-control">{accountInfo.nom}</p>
                </div>
                <div className="form-group">
                  <label className="label-email">E-mail:</label>
                  <p className="form-control">{accountInfo.email}</p>
                </div>
                <div className="button-group">
                  <label className="label-mdp">Mot de passe:</label>
                  <p className="form-control password">••••••••</p>
                  <button
                    className="btn-custom"
                    onClick={handleEditPassword}
                  >
                    Modifier le mot de passe
                  </button>
                </div>
                <br />
                <hr />
                <div className="button-group">
                  <br/>
                  <NavLink to='/moyen-de-paiement' className='link-custom my-3'>
                  <button className="btn-custom">
                  
                  Mes moyens de paiement
                
                  </button>
                  </NavLink>
                  <button className="btn-custom" onClick={handleAddresses}>
                    Mes adresses
                  </button>
                </div>
              </>
            )}
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

export default MesParametres;