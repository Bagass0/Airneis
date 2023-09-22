import { NavLink } from "react-router-dom"
import MenuNavigation from "./front/MenuNavigation";
import React, { useContext } from "react";
import { dataContext } from "../composants/context/dataContext";


function Menu() {
    const { nombreProduits } = useContext(dataContext);

    return ( 
        <div className="bg-dark">
            <nav className="navbar navbar-expand navbar-dark nav-bg border-0">
                <ul className="navbar-nav NavItems">
                    <li className="nav-item">
                    
                        <NavLink to="/" className={({isActive}) => {
                            return isActive ? "nav-link active text-light" : "nav-link"
                        }}> <img className="logo-airneis" src="http://airneis.ddns.net:3000/img/logo.svg" alt="" /><span className="NavTitre">Àirneis</span></NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav NavItems ms-auto">
                    <li className="nav-item">
                        <NavLink to="/Recherche" className={({isActive}) => {
                            return isActive ? "nav-link active text-light" : "nav-link"
                        }}><img className="icone-recherche" src="http://airneis.ddns.net:3000/img/icon_recherche.png"></img> </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/Panier" className={({isActive}) => {
                            return isActive ? "nav-link active text-light" : "nav-link"
                        }}>
                            <div style={{position: 'relative'}}>
                                <img className="icone-recherche" src="http://airneis.ddns.net:3000/img/icon_panier.png" />
                                {nombreProduits > 0 && (
                                    <div className="nombre-panier">
                                        {nombreProduits}
                                    </div>
                                )}
                            </div>
                        </NavLink>
                    </li>

                    <li className="nav-item troisbarresMenu">
                       <MenuNavigation/>
                    </li>                    
                </ul>
            </nav>
        </div>
     );
}

export default Menu;