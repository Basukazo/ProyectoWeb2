import { Link, Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>

      <div className="mb-3 d-flex gap-3">
        <Link className="btn btn-primary" to="/dashboard">Viajes</Link>
        <Link className="btn btn-primary" to="/dashboard/drivers">Choferes</Link>
        <Link className="btn btn-primary" to="/dashboard/profile">Perfil</Link>
      </div>

      {/* Aquí se dibujan las subrutas */}
      <Outlet />
    </div>
  );
}
