import React, { useState, useEffect } from "react";
import './Footer.sass';
import { logoTrans } from '../../images/Images'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FooterData } from "../../backend/FooterData/footerData";

export default function Footer() {
  const [transformLogo, setTransformLogo] = useState({});
  const year = new Date().getFullYear();

  useEffect(() => {
    setTransformLogo({ transform: 'rotate(90deg)' });
  }, []);

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <div className="img-wrapper">
            <img src={logoTrans} alt="Logo" style={transformLogo} />
            <p>SWT {year}</p>
          </div>
          <div className="social-media">
            {FooterData[4]?.socialMedia?.map((social, index) => (
              <a key={index} href={social.url} target="_blank">
                <FontAwesomeIcon icon={social.name} size="2xl" />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-right">
          {FooterData.slice(0, 4).map((data, index) => (
            <div key={index} className="footer-right-content">
              <h4>{data.title}</h4>
              <ul>
                {data.links.map((link, index) => (
                  <li key={index}>
                    <a href={link.url} target="_blank">{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};
