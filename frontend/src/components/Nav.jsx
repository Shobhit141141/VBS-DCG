import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import '../css/Nav.css';
import { useState } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import { RiLogoutCircleRLine } from "react-icons/ri";

function Nav() {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setMenu(!menu);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    setMenu(false);
  };
  const handleLinkClick = () => {
    setMenu(false); // Close the menu when a link is clicked
  };

  return (
    <div id={`navbar ${menu ? '_active' : ''}`} className='menubar-comp'>
      <div id='menubar'>
      <div className={`nav_toggle ${menu ? 'open' : ''}`} onClick={handleToggle}>
          {menu ? <IoCloseSharp /> : <FaBars />}
        </div>
      </div>
      <div className={`nav_list${menu ? '_active' : ''} `}>
        <Link to='/' className='nav_home' onClick={handleLinkClick}>
          <h4>Home</h4>
        </Link>
        <Link to='/Book' className='nav_book'  onClick={handleLinkClick}>
          <h4>Book</h4>
        </Link>
        <Link to='/Contact' className='nav_contact'  onClick={handleLinkClick}>
          <h4>Contact Us</h4>
        </Link>
        <Link to='/Holidays' className='Holidays'  onClick={handleLinkClick}>
          <h4>Holidays</h4>
        </Link>
        {!localStorage.getItem('token') ? (
          <Link to='/Signup' className='nav_signup'>
            <h4>Signup</h4>
          </Link>
        ) : (
          <Link to='/my-slots'  onClick={handleLinkClick}>My slots</Link>
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
