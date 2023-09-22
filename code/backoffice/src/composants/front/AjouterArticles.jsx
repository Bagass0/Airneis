import axios from 'axios';
import { NavLink } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
import Connexion from "./Connexion";
import { useNavigate } from "react-router-dom";

const AjouterArticles = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState('');
  const [categorie, setCategorie] = useState('');
  const [materiau, setMateriau] = useState('');
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [message, setMessage] = useState('');
  const [errorTitre, setErrorTitre] = useState('');
  const [errorImg1, setErrorImg1] = useState('');
  const [errorImg2, setErrorImg2] = useState('');
  const [errorImg3, setErrorImg3] = useState('');
  const [errorDescription, setErrorDescription] = useState('');
  const [stock, setStock] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://airneis.ddns.net:3000/categorie/categorie_acceuil.php')
      .then(response => setCategories(response.data))
      .catch(error => console.log(error));
  }, []);

  const titleRegex = /^[^</>]*$/;
  const descriptionRegex = /^[^</>]*$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('description', description);
    formData.append('prix', prix);
    formData.append('categorie', categorie);
    formData.append('materiau', materiau);
    formData.append('image', image, 'image.jpg');
    formData.append('image2', image2, 'image2.jpg');
    formData.append('image3', image3, 'image3.jpg');
    formData.append('stock', stock);

    try {
      const response = await axios.post('http://airneis.ddns.net:3000/produit/ajout_produit.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.status === "error") {
        const error = response.data.error;
        setErrorTitre(error);
        document.getElementById('error').scrollIntoView({ behavior: 'smooth' });
      }

      if (response.data.status === "success") {
        const message = response.data.message;
        setMessage('Article ajouté avec succès');
        document.getElementById('message').scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          navigate('/articles');
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setResponse('Erreur lors de l\'envoi des données');
    }
  };

  const handleNomChange = (e) => {
    const value = e.target.value;
    if (titleRegex.test(value)) {
      setNom(value);
      setErrorTitre('');
    } else {
      setErrorTitre('Le champ titre ne peut pas contenir de caractères spéciaux.');
    }
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (descriptionRegex.test(value)) {
      setDescription(value);
      setErrorDescription('');
    } else {
      setErrorDescription('Le champ description ne peut pas contenir de caractères spéciaux.');
    }
  };

  const handlePrixChange = (e) => {
    setPrix(e.target.value);
  };

  const handleCategorieChange = (e) => {
    setCategorie(e.target.value);
  };

  const handlemateriauChange = (e) => {
    setMateriau(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'image/jpeg') {
      setImage(file);
      setErrorImg1('');
    } else {
      setErrorImg1('Veuillez sélectionner un fichier au format jpg / jpeg.');
    }
  };
  
  const handleImage2Change = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'image/jpeg') {
      setImage2(file);
      setErrorImg2('');
    } else {
      setErrorImg2('Veuillez sélectionner un fichier au format jpg / jpeg.');
    }
  };
  
  const handleImage3Change = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'image/jpeg') {
      setImage3(file);
      setErrorImg3('');
    } else {
      setErrorImg3('Veuillez sélectionner un fichier au format jpg / jpeg.');
    }
  };

  const handleStockChange = (e) => {
    setStock(e.target.value);
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <div className="card">
            <div className="card-header center">
              <div className="card-title text-center display-5 mb-5 ContactTitre">Ajouter un article</div>

              <hr />

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="nom">Nom:</label>
                  <input name="nom" id="nom" type="text" placeholder="Titre de l'article" required onChange={handleNomChange} />
                  {errorTitre && <p className="ReponseFormulaire text-center mt-3 error">{errorTitre}</p>}
                </div>

                <div className="articles-card-group mb-4">
                  <label htmlFor="description">Description:</label>
                  <br />
                  <textarea name="description" id="description" rows="4" placeholder="Description de l'article" className="form-textarea" required onChange={handleDescriptionChange}></textarea>
                  {errorDescription && <p className="ReponseFormulaire text-center mt-3 error">{errorDescription}</p>}
                </div>

                <div className="articles-card-group mb-4">
                  <label htmlFor="prix">Prix:</label>
                  <input type="number" name="prix" id="prix" min="0" step="0.01" placeholder="Prix de l'article" required onChange={handlePrixChange} />
                </div>

                <div className="articles-card-group mb-4">
                  <label htmlFor="choix-item">Selectionner une catégorie: &emsp;</label>
                  <select name="select" id="choix-item" required onChange={handleCategorieChange} defaultValue="">
                    <option value="" disabled>Choisissez une option</option>
                    {categories.map((categorie, index) => (
                      <option value={categorie.id_categorie} key={categorie.id_categorie}>{categorie.nom}</option>
                    ))}
                  </select>
                </div>

                <div className="articles-card-group mb-4">
                  <label htmlFor="choix-item">Selectionner un matériau: &emsp;</label>
                  <select name="select" id="choix-item" required onChange={handlemateriauChange} defaultValue="">
                    <option value="" disabled>Choisissez une option</option>
                    <option value="bois">Bois</option>
                    <option value="acier">Acier</option>
                    <option value="plastique">Plastique</option>
                    <option value="verre">Verre</option>
                    <option value="aluminium">Aluminium</option>
                  </select>
                </div>

                <div className='img'>
                  <p className='text-center'>Upload des trois images limitées à <strong className='text-danger'>5Mo</strong> au format <strong className='text-danger'>jpg </strong>/<strong className='text-danger'> jpeg</strong></p>
                  <div className="articles-card-group mb-4">
                    <label htmlFor="image">Selectionnez une image:</label>
                    <input type="file" id='ImageArticle' accept=".jpg" required onChange={handleImageChange} />
                    {errorImg1 && <p className="ReponseFormulaire text-center mt-3 error">{errorImg1}</p>}
                  </div>

                  <div className="articles-card-group mb-4">
                    <label htmlFor="image2">Selectionnez une deuxième image:</label>
                    <input type="file" id="image2" required accept=".jpg" onChange={handleImage2Change} />
                    {errorImg2 && <p className="ReponseFormulaire text-center mt-3 error">{errorImg2}</p>}
                  </div>

                  <div className="articles-card-group mb-4">
                    <label htmlFor="image3">Selectionnez une troisième image:</label>
                    <input type="file" id="image3" required accept=".jpg" onChange={handleImage3Change} />
                    {errorImg3 && <p className="ReponseFormulaire text-center mt-3 error">{errorImg3}</p>}
                  </div>
                </div>

                <div className="articles-card-group mb-4">
                  <label htmlFor="stock">Stock:</label>
                  <input type="number" name="stock" id="stock" min="0" placeholder="Stock de l'article" required onChange={handleStockChange} />
                </div>

                <input value="Ajouter" type="submit" />

                <div id="message"></div>
                <div id="error"></div>
                {message && <p className={`ReponseFormulaire text-center mt-3 success`}>{message}</p>}
              </form>
            </div>
          </div>
          <div className="d-flex justify-content-center my-3">
            <NavLink to="/articles" className='boutonBackOfficeArticles btn btn-success'> Revenir aux articles </NavLink>
          </div>
        </>
      ) : (
        <>
          <Connexion />
        </>
      )}
    </>
  );
}

export default AjouterArticles;
