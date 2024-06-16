import { Link } from 'react-router-dom';
import { CgClose } from "react-icons/cg";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import '../css/Nav.css';
import { useState } from 'react';

function Nav() {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setMenu(!menu);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div id={`navbar ${menu ? '_active' : ''}`} className='menubar-comp'>
      <div id='menubar'>
        {!menu ? (
          <div className='nav_toggle' onClick={handleToggle}>
            <CgClose />
          </div>
        ) : (
          <div className='nav_toggle' onClick={handleToggle}>
            <CgClose />
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
        <Link to='/Holidays' className='Holidays'>
          <h4>Holidays</h4>
        </Link>
        {!localStorage.getItem('token') ? (
          <Link to='/Signup' className='nav_signup'>
            <h4>Signup</h4>
          </Link>
        ) : (
          <Link to='/my-slots'>My slots</Link>
        )}
        {!localStorage.getItem('token') ? (
          <Link to='/Login' className='nav_login'>
            <h4>Login</h4>
          </Link>
        ) : (
          <RiLogoutCircleRLine className='nav_logout' onClick={handleLogout} /> 
        )}
      </div>
    </div>
  );
}

export default Nav;
