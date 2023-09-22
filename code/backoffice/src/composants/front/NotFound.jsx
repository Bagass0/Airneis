import { NavLink } from "react-router-dom";

const NotFound = () => {
    return ( <>
        <h1 className="p-3 display-2 text-center rounded">
            Erreur 404
            <br/>
            <small>Page introuvable</small>
        </h1>
        
        <div className="text-center">
            <img src="http://airneis.ddns.net:3000/img/giphy.gif" alt="" className="mb-2 rounded"/>
        </div>

        <center>
          <NavLink to="/" className='btn btn-warning'> Retourner à l'accueil </NavLink>
        </center>
    </> 
    );
}
 
export default NotFound;