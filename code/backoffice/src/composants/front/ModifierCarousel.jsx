import { useParams, NavLink } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useContext } from 'react';
import { AuthContext } from "../context/authContext";
import Connexion from "./Connexion";

function ModifierCategorie() {
  const { isLoggedIn } = useContext(AuthContext);
  const [responseImage, setResponseImage] = useState('');
  const { id } = useParams();

  const handleSubmitImage = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const file = e.target.elements.image.files[0];

    if (file && file.type === 'image/jpeg') {
      axios.post(`http://airneis.ddns.net:3000/carousel/modifier_carousel.php`, formData)
        .then(response => setResponseImage(response.data))
        .catch(error => console.log(error));
    } else {
      setResponseImage({ status: 'error', message: 'Veuillez sélectionner un fichier au format jpg / jpeg.' });
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <>
            <div className="card">
              <div className="card-header">
                <div className="card-title text-center display-5 mb-5 ContactTitre">Modifier l'image:</div>

                <hr/>

                <form onSubmit={handleSubmitImage}>
                  {responseImage && <p className={`ReponseFormulaire text-center mt-3 ${responseImage.status === 'success' ? 'success' : 'error'}`}>{responseImage.message}</p>}

                  <div className='mb-4'>
                    <label htmlFor="icon">Image actuelle <small>(Upload limité à <strong className='text-danger'>5Mo</strong> au format <strong className='text-danger'>jpg</strong>)</small>:</label>
                    <center>
                      <img className='mb-4' src={`http://airneis.ddns.net:3000/img/carousel/${id}.jpg`} alt={id} style={{ width: '500px' }} />
                    </center>
                    <input type="file" id="image" name="image" accept=".jpg"/>  
                    <input type="hidden" name='id' id="id" value={id} />       
                  </div>
                  <input value="Modifier l'image" type="submit" />
                </form>
              </div>
            </div>
          <div className="d-flex justify-content-center my-3">
            <NavLink to="/carousel" className='boutonBackOfficeArticles btn btn-success'> Revenir aux gestionnaires de catégorie </NavLink>
          </div> 
        </>
      ) : (
        <>
          <Connexion/>
        </>
      )}  
    </>
  );
}
  
export default ModifierCategorie;
