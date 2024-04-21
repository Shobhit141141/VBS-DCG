import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import {useNavigate} from 'react-router-dom';

import '../css/Nav.css';
import { useState } from 'react';
function Nav() {
  const [menu, setmenu] = useState(false);
  const handleToggle = () => {
    setmenu(!menu);
    console.log(menu);
    console.log(`navbar${menu ? '_active' : ''}`);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('soc-token');
    navigate('/login');
  }

  return (
    <div id={`navbar ${menu ? '_active' : ''}`}>
      <div id='menubar'>
        {!menu && (
          <div className='nav_toggle' onClick={handleToggle}>
            <FaBars />
          </div>
        )}

        {menu && (
          <div className='nav_toggle' onClick={handleToggle}>
            <FaXmark />
          </div>
        )}
      </div>
      <div className={`nav_list${menu ? '_active' : ''} `}>
        <Link to='/' className='nav_home'>
          <h4>Home</h4>
        </Link>
        <Link to='/Book' className='nav_book'>
          <h4>Book</h4>
        </Link>
        <Link to='/Contact' className='nav_contact'>
          <h4>Contact Us</h4>
        </Link>
        {!localStorage.getItem('soc-token') ? (
          <Link to='/Signup' className='nav_signup'>
            <h4>Signup</h4>
          </Link>
        ) : (
          <Link to='/my-slots'>My slots</Link>
        )}
        {!localStorage.getItem('soc-token') ? (
          <Link to='/Login' className='nav_login'>
            <h4>Login</h4>
          </Link>
        ) : (
          <button className='nav_logout' onClick={handleLogout}>
            Log out
          </button>
        )}
      </div>
    </div>
  );
}

export default Nav;
