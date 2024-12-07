import React from "react";
import SearchBarComponent from "../SearchBar/SearchBarComponent";
import "./SidebarComponent.css";

const SidebarComponent = ({ onSearch, onReset }) => {
  return (
    <div className="sidebar-container">
      <h1>UBICORP</h1>
      
      <SearchBarComponent onSearch={onSearch} onReset={onReset} />
      
      <p>Explora puntos de interés y realiza operaciones.</p>
      <ul>
        <li>💡 Información sobre zonas</li>
      </ul>
    </div>
  );
};

export default SidebarComponent;
