import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { commandeVerif } from "../front/verif/VerifContact";
import { useAlert } from "../front/alert/useAlert";
import Alert from "../front/alert/Alert";

function Contact() {
  const [response, setResponse] = useState("");
  const navigate = useNavigate();
  const [alerte , setAlerte , getError] = useAlert(commandeVerif)

  const nomRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();


  const handleSubmit = (e) => {
    e.preventDefault();
  
    const demande = {
      nom : JSON.stringify(nomRef.current.value),
      email : emailRef.current.value ,
      message : JSON.stringify(messageRef.current.value),

  }

  if(getError(demande)) return ; 

    const formData = new FormData(e.target);

    let formType = {};
    formData.forEach((value, key) => (formType[key] = value));

    async function postData() {
      try {
        const response = await axios.post(
          "http://airneis.ddns.net:3000/contact/contact.php",
          formType,
          {}
        );
        setResponse(response.data);

        if (response.status === 204) {
          navigate("/");
          alert('Message envoyé ! Nous vous répondrons dans les plus brefs délais.');
        }

      } catch (error) {
      }
    }

    postData();
  };

  const handleFocus = () => {
    setAlerte({});
  }

  return (
    <>
      <div className="ContactTitre">
          <span>Formulaire de Contact</span>
      </div>

      <div className="cat-contact">
        <div>
          <div className="contact-log">Information de contact</div>
          <div className="icon-contact"><FontAwesomeIcon icon={faMapMarkerAlt} />  27-33 Av. des Champs-Élysées <br/> &nbsp; &nbsp; &nbsp; 75008,Paris, France</div><br></br>
          <div className="icon-contact"><FontAwesomeIcon icon={faEnvelope} />  airneis@hotmail.com</div><br/>
          <div className="icon-contact"><FontAwesomeIcon icon={faPhone} />  01 00 00 00 00</div>
        </div>

        <div className="contact-card">
          <div className="card-header">
            <div className="contact-log">Envoyez nous un message</div>
          </div>
          <form onSubmit={handleSubmit}>
            {response && (
              <p className="ReponseFormulaire text-center mt-3">
                {response.message}
              </p>
            )}
            <Alert alerte={alerte} />
            <div className="form-group">
              <label htmlFor="nom">Nom:</label>
              
              <input
                type="nom"
                id="nom"
                name="nom"
                placeholder="votre nom"  
                className="form-control mb-3" 
                ref={nomRef}
                onFocus={handleFocus}
              />

            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              
              <input
                type="email"
                name="email"
                id="email"
                placeholder="votre@email.fr"  
                className="form-control mb-3" 
                ref={emailRef}
                onFocus={handleFocus}
              />

            </div>

            <div className="form-message">
              <label htmlFor="message">Message:</label>

              <textarea 
                name="message"
                id="message"
                placeholder="Commentaire" 
                className="form-control mb-3" 
                rows={5} 
                ref={messageRef}
                onFocus={handleFocus}>
              </textarea>

            </div>
              
            <div className="form-group">
                <input value="Envoyer" type="submit"/>
            </div>

          </form>
        </div>
      </div>
    </>
  );
}

export default Contact;
