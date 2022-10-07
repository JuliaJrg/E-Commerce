import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";

function Home() {
  return (
    <div className="home">
      <div className="container mx-3 py-3">
        <div className="title-container">
          <h2>Acheter le meilleur pour votre ordinateur</h2>
          <div className="searchbar-container">
            <SearchBar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
