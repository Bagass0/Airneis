import { useParams, NavLink } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../context/authContext";
import Connexion from "./Connexion";

function ModifierCategorie() {
  const { isLoggedIn } = useContext(AuthContext);
  const [responseName, setResponseName] = useState('');
  const [responseIcon, setResponseIcon] = useState('');
  const [responseBanniere, setResponseBanniere] = useState('');
  const { categorie } = useParams();
  const [categories, setCategories] = useState([]);

  const titleRegex = /^[^</>]*$/;

  useEffect(() => {
    axios.get(`http://airneis.ddns.net:3000/categorie/affichage_categorie.php?categorie=${categorie}`)
      .then(response => setCategories(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleSubmitName = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const titleValue = formData.get('nom');

    if (titleRegex.test(titleValue)) {
      axios.post(`http://airneis.ddns.net:3000/categorie/modifier_nom_categorie.php`, formData)
        .then(response => setResponseName(response.data))
        .catch(error => console.log(error));
    } else {
      setResponseName({ status: 'error', message: 'Le champ nom de la catégorie ne peut pas contenir de caractères spéciaux.' });
    }
  };

  const handleSubmitIcon = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const file = e.target.elements.icon.files[0];

    if (file && file.type === 'image/jpeg') {
      axios.post(`http://airneis.ddns.net:3000/categorie/modifier_icon_categorie.php`, formData)
        .then(response => setResponseIcon(response.data))
        .catch(error => console.log(error));
    } else {
      setResponseIcon({ status: 'error', message: 'Veuillez sélectionner un fichier au format jpg / jpeg.' });
    }
  };

  const handleSubmitBanniere = e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const file = e.target.elements.banniere.files[0];

    if (file && file.type === 'image/jpeg') {
      axios.post(`http://airneis.ddns.net:3000/categorie/modifier_banniere_categorie.php`, formData)
        .then(response => setResponseBanniere(response.data))
        .catch(error => console.log(error));
    } else {
      setResponseBanniere({ status: 'error', message: 'Veuillez sélectionner un fichier au format jpg / jpeg.' });
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          {categories.map((categorie) => (
            <div className="card" key={categorie.id_categorie}>
              <div className="card-header">
                <div className="card-title text-center display-5 mb-5 ContactTitre">Modifier la catégorie: {categorie.nom}</div>

                <hr/>
              
                <form onSubmit={handleSubmitName} method="post">
                  {responseName && <p className={`ReponseFormulaire text-center mt-3 ${responseName.status === 'success' ? 'success' : 'error'}`}>{responseName.message}</p>}

                  <div className="card-group mb-4">
                    <label htmlFor="nom">Modifier le nom de la catégorie:</label>
                    <input required name="nom" id="nom" type="text" placeholder={categorie.nom} defaultValue={categorie.nom} />

                    <input type="hidden" name="id" value={categorie.id_categorie} />
                    <input type="hidden" name="ancienNom" value={categorie.nom} />
                  </div>
                  <input value="Modifier le nom de la catégorie" type="submit" />
                </form>

                <br/>
                <hr/>
                <br/>

                <form onSubmit={handleSubmitIcon}>
                  {responseIcon && <p className={`ReponseFormulaire text-center mt-3 ${responseIcon.status === 'success' ? 'success' : 'error'}`}>{responseIcon.message}</p>}
                  <div className='mb-4'>
                    <label htmlFor="icon">Icon actuelle: <small>(Upload limité à <strong className='text-danger'>5Mo</strong> au format <strong className='text-danger'>jpg</strong>)</small>:</label>
                    <center>
                      <img src={`http://airneis.ddns.net:3000/img_categorie/${categorie.id_categorie}icon.jpg`} alt={categorie.nom} style={{ width: '100px' }} />
                    </center>
                    <input type="file" id="icon" name="icon" accept=".jpg"/>  
                    <input type="hidden" name="id" id="id" value={categorie.id_categorie} />       
                  </div>
                  <input value="Modifier l'icône" type="submit" />
                </form>

                <br/>
                <hr/>
                <br/>

                <form onSubmit={handleSubmitBanniere}>
                  {responseBanniere && <p className={`ReponseFormulaire text-center mt-3 ${responseBanniere.status === 'success' ? 'success' : 'error'}`}>{responseBanniere.message}</p>}

                  <div className='mb-4'>
                    <label htmlFor="banniere">Bannière actuelle: <small>(Upload limité à <strong className='text-danger'>5Mo</strong> au format <strong className='text-danger'>jpg</strong>)</small>:</label>
                    <center>
                      <img src={`http://airneis.ddns.net:3000/img_categorie/${categorie.id_categorie}banniere.jpg`} alt={categorie.nom} style={{ width: '500px' }} />
                    </center>
                    <input type="file" id="banniere" name="banniere" accept=".jpg" />
                    <input type="hidden" name="id" id="id" value={categorie.id_categorie}/>        
                  </div>
                  <input value="Modifier la bannière" type="submit" />
                </form>
              </div>
            </div>
          ))}
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
  
export default ModifierCategorie;
