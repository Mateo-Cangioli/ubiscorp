import React, { useState, useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// Configurar ícono de Leaflet
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const MapComponent = ({ markerPosition, markerLabel }) => {
  // Usamos useMemo para evitar que `locations` cambie innecesariamente
  const locations = useMemo(() => [
    { name: "Mogrovejo, Pje. 9 de Julio", lat: -31.32686, lon: -64.26847 },
    { name: "Hospital Córdoba", lat: -31.419, lon: -64.183 },
    { name: "Catedral de Córdoba", lat: -31.413, lon: -64.181 },
    { name: "Coprin", lat: -31.396761785688756, lon: -64.25221075990666 },
    { name: "CEIN", lat: -31.41035589909494, lon: -64.16735547593574 },
    { name: "FARFALINA", lat: -31.40187607043572, lon: -64.18328786770061 },
    { name: "CENEIN", lat: -31.47361701487944, lon: -64.23334234709671 },
    { name: "DESCUBRIR", lat: -31.471739160078506, lon: -64.16125960476815 },
    { name: "CIEP", lat: -31.416422590274884, lon: -64.17858722079627 },
  ], []); // Empty dependency array, `locations` no cambiará nunca

  const initialCenter = [-31.416, -64.183]; // Coordenadas iniciales de Córdoba
  const initialZoom = 7; // Zoom inicial

  const center = markerPosition || initialCenter;
  const zoom = markerPosition ? 14 : initialZoom;

  const [distances, setDistances] = useState([]);

  // Función para calcular la distancia entre dos puntos usando la fórmula Haversine
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radio de la Tierra en km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Resultado en km
    return distance;
  };

  // Actualiza las distancias cuando cambia markerPosition
  useEffect(() => {
    if (markerPosition) {
      const [lat, lon] = markerPosition;
      const calculatedDistances = locations.map((location) => {
        const distance = calculateDistance(lat, lon, location.lat, location.lon);
        return {
          name: location.name,
          distance: distance.toFixed(2),
          lat: location.lat,
          lon: location.lon,
        };
      });

      setDistances(calculatedDistances); // Actualiza las distancias
    }
  }, [markerPosition, locations]); // Ahora incluimos 'locations' como dependencia

  // Componente para hacer zoom en la posición del marcador
  const UpdateMapView = () => {
    const map = useMap();
    useEffect(() => {
      if (markerPosition) {
        map.setView(markerPosition, 14); // Ajusta el zoom al marcador
      }
    }, [markerPosition, map]); // Ahora incluimos 'map' como dependencia
    return null;
  };

  return (
    <div className="map-container">
      <MapContainer center={center} zoom={zoom} style={{ height: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <UpdateMapView /> {/* Llamamos a este componente para manejar el zoom */}
        
        {/* Marcadores predeterminados */}
        {locations.map((location, index) => (
          <Marker key={index} position={[location.lat, location.lon]}>
            <Popup>{location.name}</Popup>
          </Marker>
        ))}

        {/* Marcador personalizado recibido desde el search */}
        {markerPosition && (
          <Marker position={markerPosition}>
            <Popup>{markerLabel}</Popup>
          </Marker>
        )}

        {/* Mostrar los marcadores de distancia */}
        {distances.map((dist, index) => (
          <Marker key={index} position={[dist.lat, dist.lon]}>
            <Popup>
              {dist.name} - {dist.distance} km
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
