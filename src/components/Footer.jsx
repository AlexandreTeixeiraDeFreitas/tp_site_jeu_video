import React from 'react';
import "../styles/Footer.css";
const Footer = () => {
  const numéro = "06.12.34.56.78";
  const site = "https://ecole-ipssi.com/";

  return (
    <footer>
      <div className="footer-content">
        <div className="footer-info">
          <p>Téléphone : {numéro}</p>
          <p>Site web : <a href={site}>{site}</a></p>
        </div>
        <p className="footer-text">All rights reserved. © 2023</p>
      </div>
    </footer>
  );
};

export default Footer;
