import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">Transporte</Link>

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="nav">
        <ul className="navbar-nav ms-auto">

          <li className="nav-item">
            <Link className="nav-link" to="/search">Buscar Choferes</Link>
          </li>

          {user ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/dashboard/profile">Perfil</Link>
              </li>

              <li className="nav-item">
                <button className="btn btn-danger ms-3" onClick={logout}>Salir</button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Iniciar sesión</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/register">Registrarse</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
