import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/authContext";
import Connexion from "./Connexion";

const Categorie = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://airneis.ddns.net:3000/categorie/categorie_acceuil.php')
          .then(response => setCategories(response.data))
          .catch(error => console.log(error));
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) {
            try {
                // Requête GET pour vérifier si l'ID correspond à un chiffre dans la table "produit"
                const response = await axios.get(`http://airneis.ddns.net:3000/categorie/verifier_id_suppression.php?id=${id}`);

                if (response.data.error) {
                    // L'ID correspond à un chiffre dans la table "produit", afficher l'erreur
                    alert(response.data.error);
                } else {
                    axios.delete(`http://airneis.ddns.net:3000/categorie/categorie_suppression.php?id=${id}`)
                        .then(response => {
                            if (response.status === 204) {
                                alert('La catégorie a été supprimée avec succès.');
                                // Actualiser la liste des catégories après la suppression
                                setCategories(categories.filter(categorie => categorie.id_categorie !== id));
                                window.location.reload();
                            }
                        })
                        .catch(error => {
                            console.log(error);
                            alert('Une erreur s\'est produite lors de la suppression de la catégorie.');
                        });
                }
            } catch (error) {
                console.log(error);
                alert('Une erreur s\'est produite lors de la vérification de la catégorie.');
            }
        }
    };

    return (
        <>
            {isLoggedIn ? (
                <>
                    <div className="ContactTitre">
                        <span>Gestion Catégorie</span>
                        <br />
                        <Link to={`/AjouterCategorie`} className="btn btn-success">Ajouter une nouvelle catégorie</Link>
                    </div>

                    <div className="tableau_contact">
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>Icon de la catégorie</th>
                                    <th>Bannière de la catégorie</th>
                                    <th>Nom de la catégorie</th>
                                    <th>Id de la catégorie</th>
                                    <th>Date d'ajout</th>
                                    <th>Modifier</th>
                                    <th>Supprimer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map(categorie => (
                                    <tr key={categorie.id_categorie}>
                                        <td>
                                            <center>
                                                <img width={100} src={`http://airneis.ddns.net:3000/img_categorie/${categorie.id_categorie}icon.jpg`} alt={`image-${categorie.nom}`} />
                                            </center>
                                        </td>
                                        <td>
                                            <center>
                                                <img width={400} src={`http://airneis.ddns.net:3000/img_categorie/${categorie.id_categorie}banniere.jpg`} alt={`image-${categorie.nom}`} />
                                            </center>
                                        </td>
                                        <td>{categorie.nom}</td>
                                        <td>{categorie.id_categorie}</td>
                                        <td>{categorie.date}</td>
                                        <td>
                                            <center>
                                                <Link to={`/modifierCategorie/${categorie.id_categorie}`} className="btn btn-warning">Modifier</Link>
                                            </center>
                                        </td>
                                        <td>
                                            <center>
                                                <button className="btn btn-danger" onClick={() => handleDelete(categorie.id_categorie)}>Supprimer</button>
                                            </center>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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

export default Categorie;
