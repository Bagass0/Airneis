import { NavLink } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useContext } from 'react';
import { AuthContext } from "../context/authContext";
import Connexion from "./Connexion";

function AjouterCategorie() {
  const { isLoggedIn } = useContext(AuthContext);
  const [responsenom, setResponsenom] = useState('');
  const [response, setResponse] = useState('');
  const [nom, setNom] = useState('');
  const [icon, setIcon] = useState(null);
  const [banniere, setBanniere] = useState(null);
  const [errorTitre, setErrorTitre] = useState('');
  const [errorImg1, setErrorImg1] = useState('');
  const [errorImg2, setErrorImg2] = useState('');

  const titleRegex = /^[^</>]*$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('icon', icon, 'icon.jpg');
    formData.append('banniere', banniere, 'banniere.jpg');
  
    try {
      const responsenom = await axios.get(`http://airneis.ddns.net:3000/categorie/verifier_categorie.php?nom=${nom}`);
  
      if (responsenom.data.error) {
        setResponsenom(responsenom.data.error);
      } else {
        const response = await axios.post('http://airneis.ddns.net:3000/categorie/creation_categorie.php', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setResponse(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  

  const handleNomChange = (e) => {
    const value = e.target.value;
    setNom(value);
    if (titleRegex.test(value)) {
      setErrorTitre('');
    } else {
      setErrorTitre({ status: 'error', message: 'Le champ nom ne peut pas contenir de caractères spéciaux.' });
    }
  };

  const handleIconChange = (e) => {
    const file = e.target.files[0];
  
    if (file && file.type === 'image/jpeg') {
      setIcon(file);
      setErrorImg1('');
    } else {
      setIcon(null);
      setErrorImg1({ status: 'error', message: 'Veuillez sélectionner un fichier au format jpg / jpeg.' });
    }
  };
  

  const handleBanniereChange = (e) => {
    const file = e.target.files[0];
  
    if (file && file.type === 'image/jpeg') {
      setBanniere(file);
      setErrorImg2('');
    } else {
      setBanniere(null);
      setErrorImg2({ status: 'error', message: 'Veuillez sélectionner un fichier au format jpg / jpeg.' });
    }
  };

  return (
    <> 
      {isLoggedIn ? (
            <>
              <div className="card">
                <div className="card-header">
                  <div className="card-title text-center display-5 mb-5 ContactTitre">Création d'une catégorie:</div>

                  <hr/>
                
                  <form onSubmit={handleSubmit}>
                    {response && <p className={`ReponseFormulaire text-center mt-3 ${response.status === 'success' ? 'success' : 'error'}`}>{response.message}</p>}
                    {responsenom && <p className='ReponseFormulaire text-center mt-3'>{responsenom}</p>}

                    <div className="card-group mb-4">
                      {errorTitre && <p className={`ReponseFormulaire text-center mt-3 ${errorTitre.status === 'success' ? 'success' : 'error'}`}>{errorTitre.message}</p>}
                      <label htmlFor="nom">Nom de la catégorie:</label>
                      <input name="nom" id="nom" type="text" placeholder="Nom de la catégorie" onChange={handleNomChange} required />
                    </div>

                    <div className='img'>
                      <p className='text-center'>Upload des deux images limitées à <strong className='text-danger'>5Mo</strong> au format <strong className='text-danger'>jpg </strong>/<strong className='text-danger'> jpeg</strong></p>
                      <div className='mb-4'>
                        {errorImg1 && <p className={`ReponseFormulaire text-center mt-3 ${errorImg1.status === 'success' ? 'success' : 'error'}`}>{errorImg1.message}</p>}
                        <label htmlFor="icon">Icon (de préférence en 300x300):</label>
                        <input type="file" id="icon" onChange={handleIconChange} accept=".jpg" required />
                      </div>

                      <div className='mb-4'>
                        {errorImg2 && <p className={`ReponseFormulaire text-center mt-3 ${errorImg2.status === 'success' ? 'success' : 'error'}`}>{errorImg2.message}</p>}
                        <label htmlFor="banniere">Bannière :</label>
                        <input type="file" id="banniere" onChange={handleBanniereChange} accept=".jpg" required />
                      </div>
                    </div>

                    <input value="Créer" type="submit" />
                  </form>
                </div>
              </div>

              <div className="d-flex justify-content-center my-3">
                <NavLink to="/categorie" className='boutonBackOfficeArticles btn btn-success'> Revenir aux gestionnaires de catégorie </NavLink>
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

export default AjouterCategorie;
