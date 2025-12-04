import { useState } from "react";
import MapPicker from "../components/MapPicker";
import { useData } from "../context/DataContext";

export default function PublicSearch() {
  const { drivers } = useData();

  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);

  const searchResults = drivers.filter((d) => d.location);

  return (
    <div className="container mt-3">
      <h2>Búsqueda de Choferes</h2>

      <h5>Origen</h5>
      <MapPicker mapId="origin-map" onLocationSelected={setOrigin} />

      <h5 className="mt-4">Destino</h5>
      <MapPicker mapId="destination-map" onLocationSelected={setDestination} />

      <hr />

      <h4>Choferes Disponibles:</h4>

      {origin && destination ? (
        searchResults.length ? (
          <ul className="list-group">
            {searchResults.map((d) => (
              <li key={d.id} className="list-group-item">
                <strong>{d.name}</strong><br />
                {d.phone}<br />
                Ubicación guardada: {d.location?.address || "Sin info"}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay choferes registrados con ubicación.</p>
        )
      ) : (
        <p>Selecciona origen y destino para buscar choferes.</p>
      )}
    </div>
  );
}
