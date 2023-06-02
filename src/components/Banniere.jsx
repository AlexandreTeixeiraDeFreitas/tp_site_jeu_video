import "../styles/Banniere.css";
import logo from '../assets/logo.png';
import { Link } from "react-router-dom";
function Banniere({ name }){
    return  (
        <div className="banniere">
            <img src={logo} className="img_logo" style={{ width: '100px' }} alt="Logo" />
            <h1>Bienvenue sur Blogeo</h1>
            <p>Bonjour, {name}</p>
            <Link to="/">Accueil</Link>
            <Link to="/liste_users">Liste de Users</Link>
            <Link to="/form_blog">ajout post</Link>
            <Link to="/todolist">todo liste</Link>
            <Link to="/meteo">méteo</Link>
            <Link to="/search">Search ville</Link>
            <Link to="/history">historique méteo</Link>
        </div>
    )
}
export default Banniere;

