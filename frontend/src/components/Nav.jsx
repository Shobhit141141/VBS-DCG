import { Link, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../css/Nav.css";
import { useState, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { RiLogoutCircleRLine } from "react-icons/ri";

function Nav() {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get the current path
  const [activeTab, setActiveTab] = useState(location.pathname);

  useEffect(() => {
    setActiveTab(location.pathname); // Update active tab on location change
  }, [location]);

  const handleToggle = () => {
    setMenu(!menu);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("socId");
    window.location.reload();
    navigate("/login");
    setMenu(false);
  };

  const handleLinkClick = () => {
    setMenu(false); // Close the menu when a link is clicked
  };

  return (
    <div id={`navbar ${menu ? "_active" : ""}`} className="menubar-comp">
      <div id="menubar">
        <div
          className={`nav_toggle ${menu ? "open" : ""}`}
          onClick={handleToggle}
        >
          {menu ? <IoCloseSharp /> : <FaBars />}
        </div>
      </div>
      <div className={`nav_list${menu ? "_active" : ""} `} id="navbar-menus">
        <Link 
          to="/" 
          className={`nav_home ${activeTab === "/" ? "active" : ""}`} 
          onClick={handleLinkClick}
        >
          <h4>Home</h4>
        </Link>
        <Link 
          to="/Book" 
          className={`nav_book ${activeTab === "/Book" ? "active" : ""}`} 
          onClick={handleLinkClick}
        >
          <h4>Book</h4>
        </Link>
        <Link 
          to="/Contact" 
          className={`nav_contact ${activeTab === "/Contact" ? "active" : ""}`} 
          onClick={handleLinkClick}
        >
          <h4>Contact Us</h4>
        </Link>
        <Link 
          to="/Holidays" 
          className={`nav_holidays ${activeTab === "/Holidays" ? "active" : ""}`} 
          onClick={handleLinkClick}
        >
          <h4>Holidays</h4>
        </Link>
        {!localStorage.getItem("token") ? (
          <Link 
            to="/Signup" 
            className={`nav_signup ${activeTab === "/Signup" ? "active" : ""}`}
          >
            <h4>Signup</h4>
          </Link>
        ) : (
          <Link 
            to="/my-slots" 
            className={`nav_my_slots ${activeTab === "/my-slots" ? "active" : ""}`} 
            onClick={handleLinkClick}
          >
            My slots
          </Link>
        )}
        {!localStorage.getItem("token") ? (
          <Link 
            to="/Login" 
            className={`nav_login ${activeTab === "/Login" ? "active" : ""}`}
          >
            <h4>Login</h4>
          </Link>
        ) : (
          <RiLogoutCircleRLine 
            className="nav_logout" 
            onClick={handleLogout} 
          />
        )}
      </div>
    </div>
  );
}

export default Nav;
