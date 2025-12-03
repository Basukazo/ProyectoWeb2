import { useData } from "../context/DataContext";
import { Link } from "react-router-dom";

export default function TripsList() {
  const { myTrips, deleteTrip } = useData();

  return (
    <div className="container mt-3">
      <h2>Mis Viajes</h2>

      <Link to="/dashboard/trips/new" className="btn btn-success mb-3">
        Crear nuevo viaje
      </Link>

      <ul className="list-group">
        {myTrips.map((t) => (
          <li key={t.id} className="list-group-item d-flex justify-content-between">
            <div>
              <strong>{t.title}</strong>
              <br />
              Chofer: {t.driver}
              <br />
              Origen: {t.origin?.address}
              <br />
              Destino: {t.destination?.address}
            </div>

            <div>
              <Link
                to={`/dashboard/trips/${t.id}/edit`}
                className="btn btn-primary btn-sm me-2"
              >
                Editar
              </Link>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteTrip(t.id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
