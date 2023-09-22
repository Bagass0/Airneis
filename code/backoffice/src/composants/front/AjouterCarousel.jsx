import { NavLink } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useContext } from 'react';
import { AuthContext } from "../context/authContext";
import Connexion from "./Connexion";

function AjouterCarousel() {
  const { isLoggedIn } = useContext(AuthContext);
  const [response, setResponse] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('image', image, 'image.jpg');
  
    try {
        const response = await axios.post('http://airneis.ddns.net:3000/carousel/ajout_carousel.php', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setResponse(response.data);
      }
    catch (error) {
    console.log(error);
    }
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type === 'image/jpeg') {
      setImage(e.target.files[0]);
      setResponse('');
    } else {
      setImage(null);
      setResponse({ status: 'error', message: 'Veuillez sélectionner un fichier au format jpg / jpeg.' });
    }
  };

  return (
    <> 
      {isLoggedIn ? (
            <>
              <div className="card">
                <div className="card-header">
                  <div className="card-title text-center display-5 mb-5 ContactTitre">Ajouter une image:</div>

                  <hr/>
                
                  <form onSubmit={handleSubmit}>
                  {response && <p className={`ReponseFormulaire text-center mt-3 ${response.status === 'success' ? 'success' : 'error'}`}>{response.message}</p>}

                    <div className='mb-4'>
                      <label htmlFor="image">Image: <small>(Upload limité à <strong className='text-danger'>5Mo</strong> au format <strong className='text-danger'>jpg</strong>)</small>:</label>
                      <input type="file" id="image" onChange={handleImageChange} accept=".jpg" />
                    </div>

                    <input value="Ajouter" type="submit" />
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

export default AjouterCarousel;
