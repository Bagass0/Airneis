import React, { useState, useEffect, useRef, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/authContext";

function MenuNavigation() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="menu-navigation">
      <div className="icone-menu" onClick={toggleMenu}>
        <img
          className="icone-recherche"
          src="http://airneis.ddns.net:3000/img/icon_menu.png"
          alt="Menu"
        />
      </div>
      <nav className={`menu ${menuOpen ? "ouvert" : ""}`} ref={menuRef}>
        <ul>

          {isLoggedIn ? (
            <>
              <li><NavLink to={"/contact"}>Formulaire de Contact</NavLink></li>
              <li><NavLink to={"http://airneis.fr"} target="_blank">airneis.fr</NavLink></li>
              <li><NavLink to={"http://airneis.fr:3000"} target="_blank">API</NavLink></li>
              <li><NavLink to={"http://86.247.29.14:3000/phpmyadmin/"} target="_blank">BDD</NavLink></li>
              <li><NavLink to={"/"} onClick={logout}>Déconnexion</NavLink></li>
            </>
          ) : (
            <>
              <li><NavLink to={"/connexion"}>Se connecter</NavLink></li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default MenuNavigation;