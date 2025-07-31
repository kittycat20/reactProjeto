import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
       <nav className="navbar">
          <div>
            <Link className='navbar-options navbar-options-title' to={"/cadastro"}>Sistema de Cadastro</Link>
          </div>
          <div>
            <Link className='navbar-options' to="/cadastro">Cadastro</Link>
            <Link className='navbar-options' to="/consulta">Consulta</Link>
          </div>
        </nav>
    )
}

export default Header;