import { useData } from "../context/DataContext";
import { Link } from "react-router-dom";

export default function DriversList() {
  const { drivers, deleteDriver } = useData();

  return (
    <div className="container mt-3">
      <h2>Lista de Choferes</h2>

      <Link to="/dashboard/drivers/new" className="btn btn-success mb-3">
        Crear chofer
      </Link>

      <ul className="list-group">
        {drivers.map((d) => (
          <li key={d.id} className="list-group-item d-flex justify-content-between">
            <div>
              <strong>{d.name}</strong>
              <br />
              Tel: {d.phone}
              <br />
              Ubicación: {d.location?.address || "No registrada"}
            </div>

            <div>
              <Link
                to={`/dashboard/drivers/${d.id}/edit`}
                className="btn btn-primary btn-sm me-2"
              >
                Editar
              </Link>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteDriver(d.id)}
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
