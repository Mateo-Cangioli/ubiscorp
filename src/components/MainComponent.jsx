// src/components/MainComponent.jsx
import React, { useState } from "react";
import SidebarComponent from "./SidebarComponent"; // Barra lateral con búsqueda
import MapComponent from "./MapComponent"; // Mapa que muestra la ubicación

const MainComponent = () => {
  // Estado que guarda la ubicación seleccionada
  const [markerPosition, setMarkerPosition] = useState(null);
  const [markerLabel, setMarkerLabel] = useState("");

  // Función que se llama cuando se realiza una búsqueda
  const handleSearch = (location) => {
    // Actualiza las coordenadas y la etiqueta con la nueva ubicación
    setMarkerPosition({ lat: location.lat, lon: location.lng });
    setMarkerLabel(location.label);
  };

  // Función para resetear el estado (cuando el usuario hace click en "Reiniciar")
  const handleReset = () => {
    setMarkerPosition(null); // Resetea la ubicación
    setMarkerLabel(""); // Resetea la etiqueta
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Barra lateral con búsqueda y reinicio */}
      <SidebarComponent onSearch={handleSearch} onReset={handleReset} />
      
      <div style={{ flex: 1 }}>
        {/* Mapa con la ubicación seleccionada y su etiqueta */}
        <MapComponent
          markerPosition={markerPosition}
          markerLabel={markerLabel}
        />
      </div>
    </div>
  );
};

export default MainComponent;
