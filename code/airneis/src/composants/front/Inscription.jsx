import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import emailjs from 'emailjs-com';

function Inscription() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    let formType = {};
    formData.forEach((value, key) => (formType[key] = formData.get(key)));

    const templateParams = {
      to_email: formType.email,
      };

    async function postData() {
      try {
        const response = await axios.post('http://airneis.ddns.net:3000/inscription.php', formType, {});
        if (response.data.status === "success") {
          const message = response.data.message;
          setMessage(message);

       
          emailjs.send('service_4l8nscb', 'template_atmdncl', templateParams, 'dLcg7jZT153kwwuzg')
            .then((response) => {
            }, (err) => {
            });

          setTimeout(() => {
           navigate('/connexion');
          }, 3000);
        }  
        if (response.data.status === "error") {
          const error = response.data.error;
          setError(error);
        }
      } catch (error) {
      }
    }

    postData();
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
          {" "}
          <img className="logo-airneis-connexion" src="http://airneis.ddns.net:3000/img/logo.svg" alt="" />
          <span className="titreConnexion">Àirneis</span>
        </NavLink>
      </div>


      <div className="login-card">
        <div className="card-header">
          <div className="log">Inscription</div>
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
            <label htmlFor="nom">Nom:</label>
            <input required="" name="nom" id="nom" type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input required="" name="email" id="email" type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe:</label>
            <input
              required=""
              name="password"
              id="password"
              type="password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="ConfirmPassword">Confirmer mot de passe:</label>
            <input
              required=""
              name="password2"
              id="password2"
              type="password"
            />
          </div>
          <div className="form-group">
            <input value="S'inscrire" type="submit" />
          </div>
          <div className="text-center">
            <NavLink className="compteNav" to="/connexion">
              Vous avez déjà un compte ?
            </NavLink>
          </div>
        </form>
      </div>
    </>
  );
}

export default Inscription;
