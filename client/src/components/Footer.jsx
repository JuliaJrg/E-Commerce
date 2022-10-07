import React from "react";
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { Link } from "react-router-dom";

function Footer() {
  const data = [
    {
      type: "Plan du site",
      subTypes: [
        "Accueil",
        "Produits",
        "Catégories",
        "Configurateur",
        "Promotions",
      ],
    },
  ];
  const socialLinks = [
    <BsFacebook />,
    <BsInstagram />,
    <BsTwitter />,
    <BsLinkedin />,
  ];
  return (
    <footer className="py-3 mx-3">
      <div className="logo-DEM">
        <img src="../../logo_e_commerce.png" alt="logo Deus Ex Machina" />
      </div>
      <div className="links">
        {data.map(({ type, subTypes }, index) => {
          return (
            <div className="link" key={index}>
              <h3 className="title">{type}</h3>
              <ul>
                  <>
                  <li>
                    <Link to="/">Accueil</Link>
                  </li>
                  <li>
                    <Link to="/produits">Produits</Link>
                  </li>
                  <li>
                      <Link to="/categories">Catégories</Link>
                  </li>
                  <li>
                      <Link to="/configurateur">Configurateur</Link>
                  </li>
                  <li>
                      <Link to="/promos">Promotions</Link>
                  </li>
                  </>
              </ul>
            </div>
          );
        })}
      </div>
      <div className="brand-container">
        <div className="brand">
          <span>Deus Ex Machina</span>
        </div>
        <p className="description">
          Créer votre ordinateur à votre image !
        </p>
        <ul className="social-links">
          {socialLinks.map((link, index) => (
            <li key={index}>{link}</li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;