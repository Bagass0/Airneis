import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../context/authContext";
import Connexion from "./Connexion";

const Contact = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const [donnees, setDonnees] = useState([]);

    useEffect(() => {
        axios.get('http://airneis.ddns.net:3000/contact/back_contact.php')
            .then(response => {
                setDonnees(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette ligne ?")) {
            axios.delete(`http://airneis.ddns.net:3000/contact/back_contact_suppression.php?id=${id}`)
            .then(response => {
                if (response.status === 204) {
                    setDonnees(donnees.filter(donnee => donnee.id !== id));
                    alert('La ligne a été supprimée avec succès.');
                }
            })
            .catch(error => {
                console.log(error);
                alert('erreur');
            });
        }
    };

    return (
        <>
            {isLoggedIn ? (
            <>
                <div className="ContactTitre">
                    <span>Formulaire de Contact</span>
                </div>

                <div className="tableau_contact">
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th>Date d'envoie</th>
                                <th>Nom</th>
                                <th>Email</th>
                                <th>Message</th>
                                <th>Contacter</th>
                                <th>Supprimer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donnees.map(donnee => (
                                <tr key={donnee.id}>
                                    <td>{donnee.date}</td>
                                    <td>{donnee.nom}</td>
                                    <td>{donnee.email}</td>
                                    <td>{donnee.message}</td>
                                    <td>
                                        <center>
                                            <a className="btn btn-warning" href={`mailto:${donnee.email}`}>Envoyer un e-mail</a>
                                        </center>
                                    </td>
                                    <td>
                                        <center>
                                            <a className="btn btn-danger" href="" onClick={() => handleDelete(donnee.id)}>Supprimer</a>
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
                <Connexion/>
            </>
        )}
        </>
    );
}
 
export default Contact;
