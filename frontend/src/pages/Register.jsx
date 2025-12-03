import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
  });

  const update = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = () => {
    register(form);
    navigate("/login");
  };

  return (
    <div className="container mt-4">
      <h2>Registro</h2>

      <div className="mb-3">
        <label>Nombre</label>
        <input name="name" className="form-control" onChange={update} />
      </div>

      <div className="mb-3">
        <label>Correo</label>
        <input name="email" className="form-control" onChange={update} />
      </div>

      <div className="mb-3">
        <label>Contraseña</label>
        <input name="password" type="password" className="form-control" onChange={update} />
      </div>

      <button className="btn btn-primary" onClick={submit}>
        Crear Cuenta
      </button>
    </div>
  );
}
