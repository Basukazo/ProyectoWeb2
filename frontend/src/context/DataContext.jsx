import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { useAuth } from "./AuthContext.jsx";

const DataContext = createContext();
export const useData = () => useContext(DataContext);

export function DataProvider({ children }) {
  const { user } = useAuth();

  const [drivers, setDrivers] = useState([]);
  const [trips, setTrips] = useState([]);

  // Load from localStorage on start
  useEffect(() => {
    const savedDrivers = JSON.parse(localStorage.getItem("drivers")) || [];
    const savedTrips = JSON.parse(localStorage.getItem("trips")) || [];

    setDrivers(savedDrivers);
    setTrips(savedTrips);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("drivers", JSON.stringify(drivers));
  }, [drivers]);

  useEffect(() => {
    localStorage.setItem("trips", JSON.stringify(trips));
  }, [trips]);

  // --------------------------
  // CRUD CHOFERES
  // --------------------------
  const addDriver = (data) => {
    const newDriver = {
      id: uuid(),
      ...data,
    };
    setDrivers([...drivers, newDriver]);
  };

  const updateDriver = (id, data) => {
    const updated = drivers.map((d) => (d.id === id ? { ...d, ...data } : d));
    setDrivers(updated);
  };

  const deleteDriver = (id) => {
    if (!window.confirm("¿Eliminar este chofer?")) return;
    setDrivers(drivers.filter((d) => d.id !== id));
  };

  // --------------------------
  // CRUD VIAJES
  // --------------------------
  const addTrip = (data) => {
    const newTrip = {
      id: uuid(),
      userId: user?.id, // trips belong to the logged user
      ...data,
    };
    setTrips([...trips, newTrip]);
  };

  const updateTrip = (id, data) => {
    const updated = trips.map((t) => (t.id === id ? { ...t, ...data } : t));
    setTrips(updated);
  };

  const deleteTrip = (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este viaje?")) return;
    setTrips(trips.filter((t) => t.id !== id));
  };

  // Trips filtered by logged user
  const myTrips = trips.filter((t) => t.userId === user?.id);

  return (
    <DataContext.Provider
      value={{
        drivers,
        trips,
        myTrips,
        addDriver,
        updateDriver,
        deleteDriver,
        addTrip,
        updateTrip,
        deleteTrip,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
