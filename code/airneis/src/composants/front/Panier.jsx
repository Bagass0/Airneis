import { useContext } from "react";
import { dataContext } from "../context/dataContext";
import { useNavigate, NavLink, Link } from "react-router-dom";

const Panier = () => {
  const {
    ajouter,
    panier,
    retirer,
    supprimer,
    nombreProduits,
    getTotalProduit,
    getTotalPanier,
  } = useContext(dataContext);
  const navigate = useNavigate();

  const handlePayer = () => {
    navigate("/Livraison");
  };

  return (
    <>
      <h1 className="mb-4 text-center">Récapitulatif de mon Panier</h1>
      <div className="rounded Min-heightConteinerPanier">
        <div className="shadow p-1 mb-1 bg-body rounded divArticles">
          <h3 className="text-center mb-5">Vos articles</h3>

          {panier.length === 0 ? (
            <center>
              <p>Votre panier est vide. ☹️</p>
              <NavLink to="/recherche" className="btn btn-success">
                Voir notre catalogue
              </NavLink>
            </center>
          ) : null}

          <table className="table">
            <tbody className="vertical-align">
              {panier.map((produit) => {
                return (
                  <tr key={produit.id}>
                    <td>
                      <Link to={`/Produit/${produit.id}`}>
                        <img
                          className="rounded d-block"
                          width={150}
                          src={`http://airneis.ddns.net:3000/img_produit/${produit.id}`}
                          alt={produit.nom}
                        />
                      </Link>
                    </td>

                    <td>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <button
                          className="custom-button"
                          disabled={produit.quantite === 1}
                          onClick={() => retirer(produit)}
                        >
                          -
                        </button>
                        <span className="mx-2">{produit.quantite}</span>
                        <button
                          className="custom-button"
                          disabled={produit.quantite >= produit.stock}
                          onClick={() => ajouter(produit)}
                        >
                          +
                        </button>
                      </div>
                      {produit.quantite >= produit.stock && (
                        <p className="text-danger">Stock insuffisant</p>
                      )}
                    </td>

                    <td>
                      {new Intl.NumberFormat("fr-FR", {
                        style: "currency",
                        currency: "EUR",
                      }).format(getTotalProduit(produit))}
                    </td>

                    <td>
                      <button
                        onClick={() => supprimer(produit)}
                        className="suprimer-panier"
                        title="Supprimer"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="shadow p-3 bg-body rounded divPrixArticles">
          <h3 className="text-center">Total à payer</h3>
          <hr />

          {panier.length > 0 ? (
            <div>
              <p>
                Tarif{" "}
                {nombreProduits > 1 && `pour (${nombreProduits} articles)`}
                :&nbsp;
                {new Intl.NumberFormat("fr-FR", {
                  style: "currency",
                  currency: "EUR",
                }).format(getTotalPanier())}
              </p>
              <p>Livraison: 10€</p>
              <div className="TotalPayer">
                <h6>
                  Total:{" "}
                  {new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                  }).format(getTotalPanier() + 10)}
                </h6>
              </div>
            </div>
          ) : null}
          <button
            className={`command-btn ${
              panier.length <= 0 ? "command-btn-disabled" : ""
            }`}
            onClick={handlePayer}
            disabled={panier.length <= 0}
          >
            Passer la commande 💳
          </button>
        </div>
      </div>
    </>
  );
};

export default Panier;
