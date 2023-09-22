import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { NavLink } from "react-router-dom"

function Footer() {
    return ( 
        <div className='footer'>
        <div className="nav-bg-footer">
            <footer className="navbar navbar-expand navbar-dark Footer mt-3">
                <ul className="navbar-nav">
                    <li className="margin-left">
                        <NavLink to="/CGU" className={({isActive}) => {
                            return isActive ? "nav-link active text-light" : "nav-link"
                        }}>Condition Général d'Utilisation</NavLink>
                    </li>
                    <li>
                        <NavLink to="/mention-legale" className={({isActive}) => {
                            return isActive ? "nav-link active text-light" : "nav-link"
                        }}>Mentions Légales</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact" className={({isActive}) => {
                            return isActive ? "nav-link active text-light" : "nav-link"
                        }}>Contact</NavLink>
                    </li>
                </ul>

                <ul className="navbar-nav ms-auto ml-">
                    <li className="nav-item">
                        <a href="http://airneis.ddns.net:3000/Airneis_v2.9.apk" target="_blank" rel="noopener noreferrer" className="nav-link">
                            <img className='apk' src='http://airneis.ddns.net:3000/img/apk.png' width='37px' title='Télécharger notre application mobile!'></img>
                            &#10094; &nbsp; Télécharger notre application mobile
                        </a>
                    </li>
                    <p>&emsp;&emsp;&emsp;</p>
                    <li className="nav-item">
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="nav-link">
                            <FontAwesomeIcon icon={faLinkedin} className="text-light" size="2x"/>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="nav-link">
                            <FontAwesomeIcon icon={faInstagram} className="text-light" size="2x" />
                        </a>
                    </li>
                    <li className="nav-item, margin-right">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="nav-link">
                            <FontAwesomeIcon icon={faFacebook} className="text-light" size="2x" />
                        </a>
                    </li>
                </ul>
            </footer>
        </div>
        </div>
     );
}

export default Footer;