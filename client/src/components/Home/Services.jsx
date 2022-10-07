import React from "react";
import { BsFillArrowRightCircleFill } from 'react-icons/bs'


function Services() {
  return (
    <div className="services-container mx-3 py-3">
      <div className="container">
        <div className="service one">
          <p>C'est les soldes !</p>
          <h4>Profitez-en pour créer votre nouvel ordinateur gaming</h4>
          <p>
            <a href="/configurateur">
              < BsFillArrowRightCircleFill />
            </a>
          </p>
        </div>
        <div className="service two">
          <div className="content">
            <h4>Programme Fidélité</h4>
            <p>
              <a href="#">
                <BsFillArrowRightCircleFill />
              </a>
            </p>
          </div>
        </div>
        <div className="service three">
          <div className="content">
            <h4>Tous nos écrans</h4>
            <p>
              <a href="/categories/Écrans">
                <BsFillArrowRightCircleFill />
              </a>
            </p>
          </div>
        </div>
        <div className="service four">
          <p>Offre de la semaine</p>
          <h4>Frais de port offerts dès 100€ d'achat</h4>
          <p>
            <a href="/promotions">
              <BsFillArrowRightCircleFill />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Services;