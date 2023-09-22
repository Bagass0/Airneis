import { useParams, NavLink } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../context/authContext";
import Connexion from "./Connexion";

function ModifierProduit() {
  const { isLoggedIn } = useContext(AuthContext);
  const [responseName, setResponseName] = useState('');
  const [responseDescription, setResponseDescription] = useState('');
  const [responsePrix, setResponsePrix] = useState('');
  const [responseCategorie, setResponseCategorie] = useState('');
  const [responseMateriau, setResponseMateriau] = useState('');
  const [responseImage, setResponseImage] = useState('');
  const [responseImage2, setResponseImage2] = useState('');
  const [responseImage3, setResponseImage3] = useState('');
  const [responseStock, setResponseStock] = useState('');
  const { id } = useParams();
  const [categorie, setCategorie] = useState([]);
  const [categories, setCategories] = useState([]);
  const [produit, setProduct] = useState(null);

  const titleRegex = /^[^</>]*$/;
  const descriptionRegex = /^[^</>]*$/;

  useEffect(() => {
    axios.get('http://airneis.ddns.net:3000/categorie/categorie_acceuil.php')
      .then(response => setCategories(response.data))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    fetch(`http://airneis.ddns.net:3000/produit.php?id=${id}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
        if (data && data.categorie) {
          axios.get(`http://airneis.ddns.net:3000/categorie/affichage_categorie.php?categorie=${data.categorie}`)
          .then(response => {
            setCategorie(response.data);
          })
            .catch(error => console.log(error));
        }
      })
      .catch(error => console.error(error));
  }, [id]);

  const handleSubmitName = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const titleValue = formData.get('nom');

    if (titleRegex.test(titleValue)) {
    axios.post(`http://airneis.ddns.net:3000/produit/modifier_produit.php`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => setResponseName(response.data))
      .catch(error => console.log(error));
    } else {
      setResponseName({ status: 'error', message: 'Le champ titre ne peut pas contenir de caractères spéciaux.' });
    }
  };

  const handleSubmitDescription = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const descriptionValue = formData.get('description');

    if (descriptionRegex.test(descriptionValue)) {
    axios.post(`http://airneis.ddns.net:3000/produit/modifier_produit.php`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => setResponseDescription(response.data))
      .catch(error => console.log(error));
    } else {
      setResponseDescription({ status: 'error', message: 'Le champ description ne peut pas contenir de caractères spéciaux.' });
    }
  };

  const handleSubmitPrix = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    axios.post(`http://airneis.ddns.net:3000/produit/modifier_produit.php`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => setResponsePrix(response.data))
      .catch(error => console.log(error));
  };

  const handleSubmitCategorie = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    axios.post(`http://airneis.ddns.net:3000/produit/modifier_produit.php`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => setResponseCategorie(response.data))
      .catch(error => console.log(error));
  };

  const handleSubmitMateriau = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    axios.post(`http://airneis.ddns.net:3000/produit/modifier_produit.php`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => setResponseMateriau(response.data))
      .catch(error => console.log(error));
  };

  const handleSubmitImage = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const file = e.target.elements.image.files[0];

    if (file && file.type === 'image/jpeg') {
      setResponseImage('');
      const formData = new FormData(e.target);
      axios.post(`http://airneis.ddns.net:3000/produit/modifier_produit_img1.php`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => setResponseImage(response.data))
        .catch(error => console.log(error));
    } else {
      setResponseImage({ status: 'error', message: 'Veuillez sélectionner un fichier au format jpg / jpeg.' });
    }
  };

  const handleSubmitImage2 = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const file = e.target.elements.image2.files[0];

    if (file && file.type === 'image/jpeg') {
      axios.post(`http://airneis.ddns.net:3000/produit/modifier_produit_img2.php`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => setResponseImage2(response.data))
        .catch(error => console.log(error));
    }else {
      setResponseImage2({ status: 'error', message: 'Veuillez sélectionner un fichier au format jpg / jpeg.' });
    }
  };

  const handleSubmitImage3 = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const file = e.target.elements.image3.files[0];

    if (file && file.type === 'image/jpeg') {
      axios.post(`http://airneis.ddns.net:3000/produit/modifier_produit_img3.php`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => setResponseImage3(response.data))
        .catch(error => console.log(error));
    }else {
      setResponseImage3({ status: 'error', message: 'Veuillez sélectionner un fichier au format jpg / jpeg.' });
    }
  };

  const handleSubmitStock = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const stockValue = formData.get('stock');

  if (stockValue === '0') {
    formData.set('stock', '0.0');
  }

    axios.post(`http://airneis.ddns.net:3000/produit/modifier_produit.php`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => setResponseStock(response.data))
      .catch(error => console.log(error));
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          {categorie.length > 0 && categorie[0] && (
            <div className="card" key={produit.id}>
              <div className="card-header">
                <div className="card-title text-center display-5 mb-5 ContactTitre">Modifier le produit: {produit.nom}</div>

                <hr/>
              
                <form onSubmit={handleSubmitName} method="post">
                  {responseName && <p className={`ReponseFormulaire text-center mt-3 ${responseName.status === 'success' ? 'success' : 'error'}`}>{responseName.message}</p>}
                  
                  <div className="card-group mb-4">
                    <label htmlFor="nom">Modifier le nom du produit:</label>
                    <input required name="nom" id="nom" type="text" placeholder={produit.nom} defaultValue={produit.nom} />

                    <input type="hidden" name="id" value={produit.id} />
                  </div>
                  <input value="Modifier le nom" type="submit" />
                </form>

                <br/>
                <hr/>
                <br/>

                <form onSubmit={handleSubmitDescription} method="post">
                  {responseDescription && <p className={`ReponseFormulaire text-center mt-3 ${responseDescription.status === 'success' ? 'success' : 'error'}`}>{responseDescription.message}</p>}
                  
                  <div className="card-group mb-4">
                    <label htmlFor="description">Modifier la description du produit:</label>
                    <textarea required name="description" id="description" type="text" className="form-textarea" placeholder={produit.description} defaultValue={produit.description} />

                    <input type="hidden" name="id" value={produit.id} />
                  </div>
                  <input value="Modifier la descritpion" type="submit" />
                </form>

                <br/>
                <hr/>
                <br/>

                <form onSubmit={handleSubmitPrix} method="post">
                  {responsePrix && <p className={`ReponseFormulaire text-center mt-3 ${responsePrix.status === 'success' ? 'success' : 'error'}`}>{responsePrix.message}</p>}

                  <div className="card-group mb-4">
                    <label htmlFor="prix">Modifier le prix du produit:</label>
                    <input type="number" name="prix" id="prix" min="0" step="0.01" placeholder={produit.prix} defaultValue={produit.prix} required/>

                    <input type="hidden" name="id" value={produit.id} />
                  </div>
                  <input value="Modifier le prix" type="submit" />
                </form>

                <br/>
                <hr/>
                <br/>

                <form onSubmit={handleSubmitCategorie}>
                  {responseCategorie && <p className={`ReponseFormulaire text-center mt-3 ${responseCategorie.status === 'success' ? 'success' : 'error'}`}>{responseCategorie.message}</p>}
                  
                  <div className='mb-4'>
                    <label htmlFor="choix-item">Selectionnez une catégorie: &emsp;</label>
                    <select name="categorie" id="categorie" required placeholder={produit.categorie} defaultValue={produit.categorie}>
                      {categories.map(categories => (
                        <option value={categories.id_categorie} key={categories.id_categorie}>{categories.nom}</option>
                      ))}
                    </select> 
                    <input type="hidden" name="id" value={produit.id} />       
                  </div>
                  <input value="Modifier la catégorie" type="submit" />
                </form>

                <br/>
                <hr/>
                <br/>

                <form onSubmit={handleSubmitMateriau}>
                  {responseMateriau && <p className={`ReponseFormulaire text-center mt-3 ${responseMateriau.status === 'success' ? 'success' : 'error'}`}>{responseMateriau.message}</p>}
                  
                  <div className='mb-4'>
                    <label htmlFor="choix-item">Selectionnez un matériau: &emsp;</label>
                    <select name="materiau" id="materiau" required placeholder={produit.materiau} defaultValue={produit.materiau}>
                      <option value="bois">Bois</option>
                      <option value="acier">Acier</option>
                      <option value="plastique">Plastique</option>
                      <option value="verre">Verre</option>
                      <option value="aluminium">Aluminium</option>
                    </select> 
                    <input type="hidden" name="id" value={produit.id} />       
                  </div>
                  <input value="Modifier le matériau" type="submit" />
                </form>

                <br/>
                <hr/>
                <br/>

                <form onSubmit={handleSubmitImage} encType="multipart/form-data">
                  {responseImage && <p className={`ReponseFormulaire text-center mt-3 ${responseImage.status === 'success' ? 'success' : 'error'}`}>{responseImage.message}</p>}
                  
                  <div className='mb-4'>
                    <label htmlFor="image">Image principale actuelle <small>(Upload limité à <strong className='text-danger'>5Mo</strong> au format <strong className='text-danger'>jpg</strong>)</small>:</label>
                    <center>
                      <img className='mb-3' src={`http://airneis.ddns.net:3000/img_produit/${produit.id}.jpg`} alt={produit.nom} style={{ width: '200px' }} />
                    </center>
                    <input type="file" id="image" name="image" accept=".jpg"/>  
                    <input type="hidden" name="id" value={produit.id} />      
                  </div>
                  <input value="Modifier l'image" type="submit" />
                </form>

                <br/>
                <hr/>
                <br/>

                <form onSubmit={handleSubmitImage2}>
                  {responseImage2 && <p className={`ReponseFormulaire text-center mt-3 ${responseImage2.status === 'success' ? 'success' : 'error'}`}>{responseImage2.message}</p>}

                  <div className='mb-4'>
                    <label htmlFor="image">Seconde image actuelle <small>(Upload limité à <strong className='text-danger'>5Mo</strong> au format <strong className='text-danger'>jpg</strong>)</small>:</label>
                    <center>
                      <img className='mb-3' src={`http://airneis.ddns.net:3000/img_produit/${produit.id}-2.jpg`} alt={produit.nom} style={{ width: '200px' }} />
                    </center>
                    <input type="file" id="image2" name="image2" accept=".jpg"/>  
                    <input type="hidden" name="id" value={produit.id}/>      
                  </div>
                  <input value="Modifier l'image" type="submit"/>
                </form>

                <br/>
                <hr/>
                <br/>

                <form onSubmit={handleSubmitImage3}>
                  {responseImage3 && <p className={`ReponseFormulaire text-center mt-3 ${responseImage3.status === 'success' ? 'success' : 'error'}`}>{responseImage3.message}</p>}

                  <div className='mb-4'>
                    <label htmlFor="image">Troisième image actuelle <small>(Upload limité à <strong className='text-danger'>5Mo</strong> au format <strong className='text-danger'>jpg</strong>)</small>:</label>
                    <center>
                      <img className='mb-3' src={`http://airneis.ddns.net:3000/img_produit/${produit.id}-3.jpg`} alt={produit.nom} style={{ width: '200px' }} />
                    </center>
                    <input type="file" id="image3" name="image3" accept=".jpg"/>  
                    <input type="hidden" name="id" value={produit.id} />      
                  </div>
                  <input value="Modifier l'image" type="submit" />
                </form>

                <br/>
                <hr/>
                <br/>

                <form onSubmit={handleSubmitStock} method="post">
                  {responseStock && <p className={`ReponseFormulaire text-center mt-3 ${responseStock.status === 'success' ? 'success' : 'error'}`}>{responseStock.message}</p>}

                  <div className="card-group mb-4">
                    <label htmlFor="stock">Modifier le stock du produit:</label>
                    <input type="number" name="stock" id="stock" min="0" placeholder={produit.stock} defaultValue={produit.stock} required/>

                    <input type="hidden" name="id" value={produit.id} />
                  </div>
                  <input value="Modifier le stock" type="submit" />
                </form>

              </div>
            </div>
          )}
          <div className="d-flex justify-content-center my-3">
            <NavLink to="/articles" className='boutonBackOfficeArticles btn btn-success'> Revenir aux gestionnaires de produit </NavLink>
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
  
export default ModifierProduit;
