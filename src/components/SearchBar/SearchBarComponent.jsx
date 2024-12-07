import React, { useState } from "react";
import "./SearchBarComponent.css";

const SearchBarComponent = ({ onSearch, onReset }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1`;
    try {
      const response = await fetch(url);
      const results = await response.json();
      if (results.length > 0) {
        const location = {
          lat: parseFloat(results[0].lat),
          lng: parseFloat(results[0].lon),
          label: results[0].display_name,
        };
        onSearch(location);
      } else {
        alert("No se encontraron resultados.");
      }
    } catch (error) {
      console.error("Error al buscar la dirección:", error);
    }
  };

  const handleReset = () => {
    setQuery(""); // Limpiar el campo de búsqueda
    onReset(); // Llamar a la función de reinicio
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Buscar dirección..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="button-container">
          <button type="submit" className="search-button">
            Buscar
          </button>
          <button type="button" onClick={handleReset} className="reset-button">
            Reiniciar
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBarComponent;
