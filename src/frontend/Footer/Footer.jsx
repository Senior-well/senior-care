import React from "react";
import './Footer.sass';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section logo">
          <img src="../images/logo.png" alt="Senior Well Logo" />
        </div>

        <div className="footer-section">
          <h4>Documents</h4>
          <ul>
            {/* eslint-disable-next-line */}
            <li><a href="#">Overview</a></li>
            {/* eslint-disable-next-line */}
            <li><a href="#">How-to guides</a></li>
            {/* eslint-disable-next-line */}
            <li><a href="#">Community support</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Senior Care</h4>
          <ul>
            {/* eslint-disable-next-line */}
            <li><a href="#">Products</a></li>
            {/* eslint-disable-next-line */}
            <li><a href="#">Software</a></li>
            {/* eslint-disable-next-line */}
            <li><a href="#">Forums</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            {/* eslint-disable-next-line */}
            <li><a href="#">Privacy Policy</a></li>
            {/* eslint-disable-next-line */}
            <li><a href="#">FAQ</a></li>
            {/* eslint-disable-next-line */}
            <li><a href="#">News</a></li>
          </ul>
        </div>

        <div className="footer-section follow-us">
          <h4>Follow us</h4>
          <div className="social-icons">
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; Senior Well 2024</p>
      </div>
    </footer>
  );
};

export default Footer;
