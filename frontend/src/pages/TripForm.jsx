import { useState } from "react";
import MapPicker from "../components/MapPicker";
import { useNavigate, useParams } from "react-router-dom";
import { useData } from "../context/DataContext";

export default function TripForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { trips, addTrip, updateTrip } = useData();

  const editing = Boolean(id);
  const tripToEdit = editing ? trips.find((t) => t.id === id) : null;

  const [form, setForm] = useState({
    title: tripToEdit?.title || "",
    driver: tripToEdit?.driver || "",
    origin: tripToEdit?.origin || null,
    destination: tripToEdit?.destination || null,
  });

  const updateField = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const save = () => {
    if (!form.origin || !form.destination) {
      alert("Debes seleccionar origen y destino en el mapa");
      return;
    }

    if (editing) {
      updateTrip(id, form);
    } else {
      addTrip(form);
    }

    navigate("/dashboard");
  };

  return (
    <div className="container mt-3">
      <h2>{editing ? "Editar Viaje" : "Crear Viaje"}</h2>

      <div className="mb-3">
        <label className="form-label">Título del viaje:</label>
        <input
          name="title"
          className="form-control"
          value={form.title}
          onChange={updateField}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Chofer:</label>
        <input
          name="driver"
          className="form-control"
          value={form.driver}
          onChange={updateField}
        />
      </div>

      <h5>Origen</h5>
      <MapPicker
        onLocationSelected={(loc) =>
          setForm({ ...form, origin: loc })
        }
      />

      <h5 className="mt-4">Destino</h5>
      <MapPicker
        onLocationSelected={(loc) =>
          setForm({ ...form, destination: loc })
        }
      />

      <button className="btn btn-primary mt-3" onClick={save}>
        Guardar
      </button>
    </div>
  );
}
