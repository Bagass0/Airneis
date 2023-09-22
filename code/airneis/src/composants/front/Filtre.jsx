import React, { useState } from 'react';
import axios from 'axios';

const Filtre = ({ setDonnees, setResultats }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [prixMin, setPrixMin] = useState("");
  const [prixMax, setPrixMax] = useState("");
  const [stockDisponible, setStockDisponible] = useState(false);
  const [materiaux, setMateriaux] = useState({
    bois: false,
    acier: false,
    plastique: false,
    verre: false,
    aluminium: false
  });

  const handleChangePrixMin = (e) => {
    setPrixMin(e.target.value);
  };

  const handleChangePrixMax = (e) => {
    setPrixMax(e.target.value);
  };

  const handleChangeStockDisponible = (e) => {
    setStockDisponible(e.target.checked);
  };

  const handleChangeMateriaux = (e) => {
    setMateriaux({ ...materiaux, [e.target.name]: e.target.checked });
  };

  const handleApplyFilter = () => {
    setIsOpen(false);
    const selectedMaterials = Object.keys(materiaux).filter(
      (material) => materiaux[material]
    );
    axios
      .get("http://airneis.ddns.net:3000/recherche.php", {
        params: {
          min_price: prixMin,
          max_price: prixMax,
          materiaux: selectedMaterials.join(","),
          stock_disponible: stockDisponible ? 1 : 0, 
        },
      })
      .then((response) => {
        setDonnees(response.data);
        setResultats(response.data);
      });
  };
  

  if (!isOpen == true) {
    return null;
  }

  return (
    <div className="filtre">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card">
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label htmlFor="prixMin">Prix minimum</label>
                  <input
                    type="number"
                    className="form-control"
                    id="prixMin"
                    value={prixMin}
                    onChange={handleChangePrixMin}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="prixMax">Prix maximum</label>
                  <input
                    type="number"
                    className="form-control"
                    id="prixMax"
                    value={prixMax}
                    onChange={handleChangePrixMax}
                  />
                </div>
                <div className="form-group">
                  <label>Materiaux</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="bois"
                      name="bois"
                      checked={materiaux.bois}
                      onChange={handleChangeMateriaux}
                    />
                    <label className="form-check-label" htmlFor="bois">
                      Bois
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="acier"
                      name="acier"
                      checked={materiaux.acier}
                      onChange={handleChangeMateriaux}
                    />
                    <label className="form-check-label" htmlFor="acier">
                      Acier
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="plastique"
                      name="plastique"
                      checked={materiaux.plastique}
                      onChange={handleChangeMateriaux}
                    />
                    <label className="form-check-label" htmlFor="plastique">
                      Plastique
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="verre"
                      name="verre"
                      checked={materiaux.verre}
                      onChange={handleChangeMateriaux}
                    />
                    <label className="form-check-label" htmlFor="verre">
                      Verre
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="aluminium"
                      name="aluminium"
                      checked={materiaux.aluminium}
                      onChange={handleChangeMateriaux}
                    />
                    <label className="form-check-label" htmlFor="aluminium">
                      Aluminium
                    </label>
                  </div>
                </div>
                <div className="form-group">
  <input
    className="form-check-input"
    type="checkbox"
    id="stockDisponible"
    name="stockDisponible"
    checked={stockDisponible}
    onChange={handleChangeStockDisponible}
  />
  <label className="form-check-label" htmlFor="stockDisponible">
    Stock disponible uniquement
  </label>
</div>

                <div className="form-group">
                  <button type="button" className="btn btn-primary btn-block" onClick={handleApplyFilter}>
                    Appliquer les filtres
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filtre;
