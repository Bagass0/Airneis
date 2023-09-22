import { NavLink } from "react-router-dom"
import MenuNavigation from "./front/MenuNavigation";

function Menu() {
    return ( 
        <div className="bg-dark mb-3">
            <nav className="navbar navbar-expand navbar-dark nav-bg border-0">
                <ul className="navbar-nav NavItems">
                    <li className="nav-item">
                    
                        <NavLink to="/" className={({isActive}) => {
                            return isActive ? "nav-link active text-light" : "nav-link"
                        }}> <img className="logo-airneis" src="http://airneis.ddns.net:3000/img/logo.svg" alt="" /><span className="NavTitre">Àirneis - Back-Office</span></NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav NavItems ms-auto">                  
                    <li className="nav-item troisbarresMenu">
                       <MenuNavigation/>
                    </li>                    
                </ul>
            </nav>
        </div>
     );
}

export default Menu;