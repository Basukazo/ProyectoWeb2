import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const rutas = [
      { id: 1, nombre: "Ruta 1", horario: "6:00 am - 7:00 pm" },
      { id: 2, nombre: "Ruta 2", horario: "5:30 am - 8:00 pm" },
      { id: 3, nombre: "Ruta 3", horario: "6:15 am - 8:30 pm" },
    ];

  return (
    <div className="container mt-4">
      <h2>Rutas Disponibles</h2>
      <div className="row">
        {rutas.map((r) => (
          <div key={r.id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5>{r.nombre}</h5>
                <p>Horario: {r.horario}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App
