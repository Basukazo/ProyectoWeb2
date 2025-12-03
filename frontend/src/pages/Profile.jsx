import { useAuth } from "../context/AuthContext.jsx";
import { useState } from "react";

export default function Profile() {
  const { user, updateProfile } = useAuth();

  const [name, setName] = useState(user?.name || "");

  const save = () => {
    updateProfile({ name });
    alert("Perfil actualizado");
  };

  return (
    <div className="container mt-4">
      <h2>Mi Perfil</h2>

      <div className="mb-3">
        <label>Nombre</label>
        <input
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <button className="btn btn-primary" onClick={save}>
        Guardar
      </button>
    </div>
  );
}
