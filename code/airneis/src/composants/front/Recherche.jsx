import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { dataContext } from "../context/dataContext";
import { Link } from "react-router-dom";
import Filtre from "./Filtre";

const Recherche = () => {
  const [donnees, setDonnees] = useState([]);
  const [resultats, setResultats] = useState([]);
  const [aucunResultat, setAucunResultat] = useState(false);
  const [afficherFiltre, setAfficherFiltre] = useState(false);
  const [filtreRecherche, setFiltreRecherche] = useState("");
  const { ajouter } = useContext(dataContext);
  const [produitsParPage, setProduitsParPage] = useState(9);
  const [pageCourante, setPageCourante] = useState(1);
  const conteneurRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://airneis.ddns.net:3000/recherche.php")
      .then((response) => {
        setDonnees(response.data);
        setResultats(response.data);
      })
      .catch((error) => {});
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    setPageCourante(1);

    const filtreRechercheTrimmed = filtreRecherche.trim().toLowerCase();
    const resultatsFiltres = donnees.filter((donnee) => {
      const nomProduit = donnee.nom.toLowerCase();
      if (nomProduit === filtreRechercheTrimmed) {
        return true;
      }
      if (
        nomProduit.length === filtreRechercheTrimmed.length &&
        differeDUnCaractere(nomProduit, filtreRechercheTrimmed)
      ) {
        return true;
      }
      if (nomProduit.startsWith(filtreRechercheTrimmed)) {
        return true;
      }
      if (nomProduit.includes(filtreRechercheTrimmed)) {
        return true;
      }
      return false;
    });

    setResultats(resultatsFiltres);
    setAucunResultat(resultatsFiltres.length === 0);
  }

  function handleFilterClick() {
    setFiltreRecherche("");
    setAfficherFiltre(!afficherFiltre);
  }

  useEffect(() => {
    const filtreRechercheTrimmed = filtreRecherche.trim().toLowerCase();
    if (filtreRechercheTrimmed === "") {
      setResultats(donnees);
      setAucunResultat(false);
    } else {
      axios
        .get(`http://airneis.ddns.net:3000/recherche.php?recherche=${filtreRechercheTrimmed}`)
        .then((response) => {
          const resultatsFiltres = response.data.filter((donnee) => {
            const nomProduit = donnee.nom.toLowerCase();
            if (nomProduit === filtreRechercheTrimmed) {
              return true;
            }
            if (
              nomProduit.length === filtreRechercheTrimmed.length &&
              differeDUnCaractere(nomProduit, filtreRechercheTrimmed)
            ) {
              return true;
            }
            if (nomProduit.startsWith(filtreRechercheTrimmed)) {
              return true;
            }
            if (nomProduit.includes(filtreRechercheTrimmed)) {
              return true;
            }
            return false;
          });

          setResultats(resultatsFiltres);
          setAucunResultat(resultatsFiltres.length === 0);
        })
        .catch((error) => {});
    }
    setPageCourante(1);
  }, [filtreRecherche]);

  useEffect(() => {
    conteneurRef.current.scrollIntoView({ behavior: "smooth" });
  }, [pageCourante]);

  function differeDUnCaractere(chaine1, chaine2) {
    let diffCount = 0;
    for (let i = 0; i < chaine1.length; i++) {
      if (chaine1[i] !== chaine2[i]) {
        diffCount++;
        if (diffCount > 1) {
          return false;
        }
      }
    }
    return diffCount === 1;
  }

  const indexDernierProduit = pageCourante * produitsParPage;
  const indexPremierProduit = indexDernierProduit - produitsParPage;
  const produitsAffiches = resultats.slice(indexPremierProduit, indexDernierProduit);
  const totalPages = Math.ceil(resultats.length / produitsParPage);

  return (
    <>
      <div className="text-center">
        <h1></h1>
      </div>
      <br />
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Rechercher des produits"
                  value={filtreRecherche}
                  onChange={(event) => setFiltreRecherche(event.target.value)}
                />
                <div className="input-group-append justify-content-end align-items-center">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ marginLeft: "10px", marginTop: "5px" }}
                  >
                    <img
                      style={{ width: "24px" }}
                      src="http://airneis.ddns.net:3000/img/icon_recherche.png"
                      alt="Rechercher"
                    />
                    Rechercher
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ marginLeft: "10px", marginTop: "5px" }}
                    onClick={handleFilterClick}
                  >
                    Filtres
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {aucunResultat && filtreRecherche.trim() !== "" && (
        <div className="alert alert-danger text-center mt-5" role="alert">
          Aucun résultat trouvé pour votre recherche.
        </div>
      )}
      {afficherFiltre && (
        <Filtre
          setDonnees={setResultats}
          setResultats={setResultats}
          fermerFiltre={() => setAfficherFiltre(false)}
        />
      )}
      <div className="container mt-4" ref={conteneurRef}>
        <div className="row justify-content-center">
          {produitsAffiches.map((resultat) => (
            <div className="col-md-4 mb-3" key={resultat.id}>
              <div className="card">
                <Link to={`/Produit/${resultat.id}`}>
                  <img
                    className="card-img-top"
                    src={`http://airneis.ddns.net:3000/img_produit/${resultat.id}`}
                    alt={resultat.nom}
                    style={{ objectFit: "cover", height: "300px" }}
                  />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">{resultat.nom}</h5>
                  <p className="price-text">{resultat.prix} €</p>
                  <center>
                    {resultat.stock > 0 ? (
                      <button className="add-to-cart-btn" onClick={() => ajouter(resultat)}>
                        <span>Ajouter au panier 🛒</span>
                      </button>
                    ) : (
                      <button className="out-of-stock-btn" disabled>
                        <span>Stock épuisé</span>
                      </button>
                    )}
                  </center>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row justify-content-center mt-3">
          <div className="col-md-12 text-center pagination-bar">
            <button
              className="prev-btn"
              onClick={() => setPageCourante(pageCourante - 1)}
              disabled={pageCourante === 1}
            >
              Précédent
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((numPage) => (
              <React.Fragment key={numPage}>
                {numPage !== 1 && <span className="divider">|</span>}
                <button
                  className={`pagination-btn ${numPage === pageCourante ? "active" : ""}`}
                  onClick={() => setPageCourante(numPage)}
                >
                  {numPage}
                </button>
              </React.Fragment>
            ))}
            <button
              className="next-btn"
              onClick={() => setPageCourante(pageCourante + 1)}
              disabled={pageCourante === totalPages}
            >
              Suivant
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Recherche;
