import React, { useState } from "react";
import MapComponent from "./components/Map/MapComponent";
import SidebarComponent from "./components/Sidebar/SidebarComponent";
import "./App.css";

const App = () => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [markerLabel, setMarkerLabel] = useState("");

  const handleSearch = (location) => {
    setMarkerPosition([location.lat, location.lng]);
    setMarkerLabel(location.label);
  };

  const resetSearch = () => {
    setMarkerPosition(null);
    setMarkerLabel("");
  };

  return (
    <div className="app-container">
      <SidebarComponent onSearch={handleSearch} onReset={resetSearch} />
      <MapComponent markerPosition={markerPosition} markerLabel={markerLabel} />
    </div>
  );
};

export default App;
