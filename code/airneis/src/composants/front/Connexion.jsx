import axios from "axios";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";

function Connexion({ previousLocation }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const authContext = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    let formType = {};
    formData.forEach((value, key) => (formType[key] = formData.get(key)));

    try {
      const response = await axios.post(
        "http://airneis.ddns.net:3000/connexion.php",
        formType,
        {}
      );
      if (response.data.status === "success") {
        const message = response.data.message;
        setMessage(message);
        setTimeout(() => {
          if (previousLocation) {
            navigate(previousLocation);
          } else {
            navigate("/");
          }
        }, 2000);
        const { accountId, accountInfo } = response.data;
        authContext.login(accountId, accountInfo);
      }
      if (response.data.status === "error") {
        const error = response.data.error;
        setError(error);
      }
    } catch (error) {
      }
  };

  return (
    <>
      <div className="ConnexionTitre">
        <NavLink
          to="/"
          className={({ isActive }) => {
            return isActive ? "nav-link active text-light" : "nav-link";
          }}
        >
          <img
            className="logo-airneis-connexion"
            src="http://airneis.ddns.net:3000/img/logo.svg"
            alt=""
          />
          <span className="titreConnexion">Àirneis</span>
        </NavLink>
      </div>

      <div className="login-card">
        <div className="card-header">
          <div className="log">Connexion</div>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <div className="mt-4" id="message">
              {message && (
                <p className="alert alert-success text-center" id="message">
                  {message}
                </p>
              )}
            </div>
            <div className="mt-4" id="error">
              {error && (
                <p className="alert alert-danger text-center" id="error">
                  {error}
                </p>
              )}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input required="" name="email" id="email" type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe:</label>
            <input required="" name="password" id="password" type="password" />
          </div>
          <div className="form-group">
            <input value="Se connecter" type="submit" />
          </div>
        </form>
        <div className="text-center">
          <NavLink className="compteNav" to="/inscription">
            Créer un compte ?
          </NavLink>
        </div>
        <div className="text-center">
          <NavLink className="compteNav" to="/forgot-password">
            Mot de passe oublié
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Connexion;
