import { Link } from 'react-router-dom';
import LogoutUser from './../users/LogoutUser.js';

function Header() {
  return (
    <div className='Header'>
        <div className='header-logo'><img src='/logo.jpeg'/></div>
        <div className='header-menu'>
            <Link to="/videoconference" > go to conference</Link>

            <Link to="/login" >Login</Link>
            <LogoutUser/>
        </div>
    </div>
  )
}

export default Header