import React from "react";
function Promo() {
  return (
    <div className="promo-container">
      <div className="container mx-3 py-3">
        <div className="content">
          <div className="title-container">
            <h2>Newsletter</h2>
            <p>
              Inscrivez-vous à notre newsletter pour en rien rater !
            </p>
          </div>
          <div className="subscribe-container">
            <input type="email" placeholder="votre@email.com" />
            <button>S'inscrire</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Promo;