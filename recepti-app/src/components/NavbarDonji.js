import React from 'react';
import '../stilovi/navbarDonji.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function NavbarDonji() {
  return (
    <nav className="navbar-donji">
      <div className="navbar-donji-container">
        <div className="navbar-donji-logo">
          <h1>Follow us</h1>
        </div>
        <ul className="navbar-donji-menu">
          <li className="navbar-donji-item">
            <a href="https://www.facebook.com" className="navbar-donji-link">
              <FaFacebook />
            </a>
          </li>
          <li className="navbar-donji-item">
            <a href="https://www.twitter.com" className="navbar-donji-link">
              <FaTwitter />
            </a>
          </li>
          <li className="navbar-donji-item">
            <a href="https://www.instagram.com" className="navbar-donji-link">
              <FaInstagram />
            </a>
          </li>
          <li className="navbar-donji-item">
            <a href="https://www.linkedin.com" className="navbar-donji-link">
              <FaLinkedin />
            </a>
          </li>
        </ul>
        <div className="navbar-donji-followus">
        </div>
      </div>
    </nav>
  );
}

export default NavbarDonji;
