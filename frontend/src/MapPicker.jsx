import { useState, useEffect } from "react";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

export default function MapPicker({ onLocationSelected }) {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    // Inicializar mapa
    const mapInstance = L.map("map").setView([9.93, -84.08], 13); // San José CR

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(mapInstance);

    setMap(mapInstance);

    return () => mapInstance.remove();
  }, []);

  // Manejar click en el mapa
  useEffect(() => {
    if (!map) return;

    map.on("click", (e) => {
      const { lat, lng } = e.latlng;

      if (marker) {
        marker.setLatLng([lat, lng]);
      } else {
        const newMarker = L.marker([lat, lng]).addTo(map);
        setMarker(newMarker);
      }

      onLocationSelected({ lat, lng, address: "Punto seleccionado en el mapa" });
    });
  }, [map, marker]);

  // Búsqueda con Nominatim API
  const handleSearch = async () => {
    if (!query) return;

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${query}&format=json`
    );
    const data = await res.json();
    setSearchResults(data);
  };

  // Seleccionar resultado de autocompletar
  const selectLocation = (place) => {
    const lat = parseFloat(place.lat);
    const lng = parseFloat(place.lon);

    map.setView([lat, lng], 16);

    if (marker) {
      marker.setLatLng([lat, lng]);
    } else {
      const newMarker = L.marker([lat, lng]).addTo(map);
      setMarker(newMarker);
    }

    onLocationSelected({
      lat,
      lng,
      address: place.display_name,
    });

    setSearchResults([]);
    setQuery(place.display_name);
  };

  return (
    <div>
      <div className="d-flex mb-2">
        <input
          className="form-control me-2"
          value={query}
          placeholder="Buscar lugar..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch} className="btn btn-primary">
          Buscar
        </button>
      </div>

      {searchResults.length > 0 && (
        <ul className="list-group mb-2">
          {searchResults.map((place) => (
            <li
              key={place.place_id}
              className="list-group-item list-group-item-action"
              onClick={() => selectLocation(place)}
            >
              {place.display_name}
            </li>
          ))}
        </ul>
      )}

      <div id="map" style={{ height: "300px", width: "100%" }}></div>
    </div>
  );
}
