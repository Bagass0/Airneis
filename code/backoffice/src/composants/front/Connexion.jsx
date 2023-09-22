import axios from "axios";
import { NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";


function Connexion() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const authContext = useContext(AuthContext); // Utiliser le contexte AuthContext

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    let formType = {};
    formData.forEach((value, key) => (formType[key] = formData.get(key)));

    async function postData() {
      try {
        const response = await axios.post(
          "http://airneis.ddns.net:3000/connexion_backoffice.php",
          formType,
          {}
        );
        if (response.data.status === "success") { 
          const message = response.data.message;
          setMessage(message);
          setTimeout(() => {
            authContext.login(response.data.accountId);
          }, 1000);
        }
        if (response.data.status === "error") {
          const error = response.data.error;
          setError(error);
        }
      } catch (error) {
        console.log(error);
      }
    }

    postData();
  };

  return (
    <>
      <center>
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
      </center>

      <div className="login-card">
        <div className="card-connexion">
          <div className="log">Connexion</div>
        </div>
        <form onSubmit={handleSubmit}>
        <div>      
            <div className='mt-4'id='message'>
              {message && <p className='alert alert-success text-center' id='message'>{message}</p>}
            </div>
            <div className='mt-4'id='error'>
              {error && <p className='alert alert-danger text-center' id='error'>{error}</p>}
            </div>
        </div> 
          <div className="form-group">
            <label htmlFor="email">Nom d'utilisateur:</label>
            <input required="" name="nom" id="nom" type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe:</label>
            <input required="" name="password" id="password" type="password" />
          </div>
          <div className="form-group">
            <input value="Se connecter" type="submit" />
          </div>
        </form>
      </div>
    </>
  );
}

export default Connexion;
