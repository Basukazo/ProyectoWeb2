import { useState } from "react";
import MapPicker from "../components/MapPicker";
import { useNavigate, useParams } from "react-router-dom";
import { useData } from "../context/DataContext";

export default function DriverForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { drivers, addDriver, updateDriver } = useData();

  const editing = Boolean(id);
  const driverToEdit = editing ? drivers.find((d) => d.id === id) : null;

  const [form, setForm] = useState({
    name: driverToEdit?.name || "",
    phone: driverToEdit?.phone || "",
    location: driverToEdit?.location || null,
  });

  const save = () => {
    if (editing) updateDriver(id, form);
    else addDriver(form);
    navigate("/dashboard/drivers");
  };

  return (
    <div className="container mt-3">
      <h2>{editing ? "Editar Chofer" : "Crear Chofer"}</h2>

      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input
          className="form-control"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Teléfono</label>
        <input
          className="form-control"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />
      </div>

      <h5>Ubicación del chofer (opcional)</h5>
          <MapPicker
      mapId="driver-location-map"
      onLocationSelected={(loc) =>
        setForm({ ...form, location: loc })
      }
    />

      <button className="btn btn-primary mt-3" onClick={save}>
        Guardar
      </button>
    </div>
  );
}
