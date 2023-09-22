import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Gallery from '../Slider';
import { Link } from 'react-router-dom';

const Accueil = () => {
  
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://airneis.ddns.net:3000/accueil.php')
      .then(response => setImages(response.data.slice(0, 3)))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    axios.get('http://airneis.ddns.net:3000/categorie/categorie_acceuil.php')
      .then(response => setCategories(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <div  className="mt-3">
        <Gallery/>
      </div>
      <div className="info-airneis mt-5">
        <p>VENANT DES HAUTES TERRES D'ÉCOSSE</p>
        <p>NOS MEUBLES SONT IMMORTELS</p>
      </div>

      <div className="cat">
        <div className="content-img">
          {categories.map((categorie) => (
            <div className="mb-5 mt-5 img1 img2" key={categorie.nom}>
              <center>
                <Link to={`/Categorie/${categorie.id_categorie}`}>
                  <img id='icon-cat' width={100} src={`http://airneis.ddns.net:3000/img_categorie/${categorie.id_categorie}icon.jpg`} alt={`image-${categorie.nom}`} />
                  <p className='categorie'>{categorie.nom}</p>
                </Link>
              </center>
            </div>
          ))}
        </div>
      </div>

      <br/>

      <div className="info-airneis mt-5">
        <p>Les Highlanders du moment 🔥</p>
      </div>

      <div className="cat">
        <div className="highlander" >
          {images.map((image, index) => (
            <div className="col mb-5 mt-5 img1 img2" key={index}>
              <Link to={`/Produit/${image.id}`}>
                <img id='rounded-img'  width={400} height={400} src={`http://airneis.ddns.net:3000/img_produit/${image.id}`} alt={`image-${index}`} />
                <p className='categorie'>{image.nom}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Accueil;