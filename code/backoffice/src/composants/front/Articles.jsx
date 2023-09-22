import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from "../context/authContext";
import Connexion from "./Connexion";

const Articles = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://airneis.ddns.net:3000/articles.php')
      .then(response => {
        setImages(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleImageClick = (index) => {
    const image = images[index];

    if(selectedImages.includes(image)) 
    {
      setSelectedImages(selectedImages.filter(selectedImage => selectedImage !== image));
    }
    else if(selectedImages.length < 3) 
    {
      setSelectedImages([...selectedImages, image]);
    } 
    else 
    {
      alert('Vous ne pouvez pas sélectionner plus de 3 images.');
    }
  };

  const handleSubmit = () => {
    const data = { images: selectedImages };
  
    if(selectedImages < 1) 
    {
      alert("Veuillez choisir au moins un article !");
    } else 
    {
      axios.post('http://airneis.ddns.net:3000/update_features.php', data)
        .then(response => {
          if (response.data.status === "error")
          {
            const error = response.data.error;
            setError(error);
            document.getElementById('error').scrollIntoView({ behavior: 'smooth' });
          }
          const message = response.data.message;
          setMessage(message);
          document.getElementById('message').scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        })
        .catch(error => console.log(error));
    }    
  }
  

  const handleDelete = () => {
    const data = { images: selectedImages };
  
    if(selectedImages < 1)
    {
      alert("Veuillez choisir au moins un article !");
    }
    else
    {
      if(window.confirm("Êtes-vous sûr de vouloir supprimer le ou les article(s) sélectionné(s) ?")) {
        axios.post('http://airneis.ddns.net:3000/produit/delete_articles.php', data)
          .then(response => {
            // Récupérer le message envoyé par le serveur
            const message = response.data.message;

            if (response.data.status === "success")
            {
              setMessage(message);
              console.log(message);
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            }

            if (response.data.status === "error")
            {
              const error = response.data.error;
              setError(error);
            }
            
          })
          .catch(error => console.log(error));
        }
    }    
  }

  const handleModif = () => {
  
    if (selectedImages.length < 1 ) {
      setError("Selectionnez une image pour modifier un article !");
      // Faire défiler la page jusqu'à l'élément message
      document.getElementById('aimant').scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
    else if(selectedImages.length > 1) {
      setError("Selectionnez seulement une image !");
      // Faire défiler la page jusqu'à l'élément message
      document.getElementById('aimant').scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
    else {
      const selecteudImage = selectedImages[0];
      navigate(`/modifierProduit/${selecteudImage.id}`);
      }
  } ;
  
  
  
  return (
    <>
      {isLoggedIn ? (
        <>
          <div className="info-airneis mt-5">
            <p>ESPACE ADMINISTRATION AIRNEIS</p>
            <p>SELECTION DES ARTICLES</p>
          </div>

          <div className="cat">
            <div className="content-img">
              {images.map((image, index) => (
                <div
                  className={`articles ${selectedImages.includes(image) ? 'selected' : ''}`}
                  key={index}
                  onClick={() => handleImageClick(index)}
                >
                  <p className='text-center'>{image.nom}</p>
                  <img className="rounded mx-auto d-block" width={250} height={200} src={`http://airneis.ddns.net:3000/img_produit/${image.id}`} alt={`image-${index}`} />
                  <p className='m-2 text-primary'>Prix : {image.prix} €</p>
                  <p className='m-2 text-primary'>Stock : {image.stock}</p>

                  {image.stock == 1 ? (
                    <p className='m-2 text-danger'>Plus que 1 produit en stock !</p>
                  ) : null }

                  {image.stock == 0 ? (
                    <p className='m-2 text-danger'>Stock épuisé</p>
                  ) : null}

                </div>
              ))}
            </div>
          </div>
          
          <div>      
            <div className='mt-4'id='message'>
              {message && <p className='alert alert-success text-center' id='message'>{message}</p>}
            </div>
            <div className='mt-4'id='error'>
              {error && <p className='alert alert-danger text-center' id='error'>{error}</p>}
            </div>
          </div>  

          <div className="d-flex justify-content-center my-3 mx-5">
            {selectedImages.length > 1 ? (
              <button onClick={handleDelete} className='boutonBackOfficeArticles btn btn-danger'>Supprimer des articles</button>
            ) : null}

            {selectedImages.length === 1 ? (
              <button onClick={handleDelete} className='boutonBackOfficeArticles btn btn-danger'>Supprimer un article</button>
            ) : null}

            {selectedImages.length === 0 ? (
              <button onClick={handleDelete} className='boutonBackOfficeArticles btn btn-danger' disabled >Supprimer </button>
            ) : null}

            <button onClick={handleSubmit} className='boutonBackOfficeArticles btn btn-primary'>Mettre en exposition</button>

            {selectedImages.length === 1 ? (
              <button onClick={handleModif} className="boutonBackOfficeArticles btn btn-warning">Modifier</button>
            ) : (
              <button onClick={handleModif} className="boutonBackOfficeArticles btn btn-warning" disabled >Modifier</button>
            )}
            <NavLink to="/ajouter-articles" className='boutonBackOfficeArticles btn btn-success'>Ajouter un nouveau Produit</NavLink>
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

export default Articles;
