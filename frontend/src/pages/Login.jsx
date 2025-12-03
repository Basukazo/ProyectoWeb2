import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const update = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = () => {
    const ok = login(form.email, form.password);
    if (!ok) return alert("Credenciales inválidas");
    navigate("/dashboard");
  };

  return (
    <div className="container mt-4">
      <h2>Iniciar Sesión</h2>

      <div className="mb-3">
        <label>Correo</label>
        <input name="email" className="form-control" onChange={update} />
      </div>

      <div className="mb-3">
        <label>Contraseña</label>
        <input name="password" type="password" className="form-control" onChange={update} />
      </div>

      <button className="btn btn-primary" onClick={submit}>
        Ingresar
      </button>
    </div>
  );
}
