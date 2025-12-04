import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Context
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";

// Pages
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TripsList from "./pages/TripsList";
import TripForm from "./pages/TripForm";
import DriversList from "./pages/DriversList";
import DriverForm from "./pages/DriverForm";
import Profile from "./pages/Profile";
import PublicSearch from "./pages/PublicSearch";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>

          {/* Navbar visible siempre */}
          <Navbar />

          <Routes>

            {/* Rutas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/search" element={<PublicSearch />} />

            {/* Dashboard protegido */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            >

              {/* Subrutas del Dashboard */}
              <Route index element={<TripsList />} />

              {/* Viajes */}
              <Route path="trips/new" element={<TripForm />} />
              <Route path="trips/:id/edit" element={<TripForm />} />

              {/* Choferes */}
              <Route path="drivers" element={<DriversList />} />
              <Route path="drivers/new" element={<DriverForm />} />
              <Route path="drivers/:id/edit" element={<DriverForm />} />

              {/* Perfil */}
              <Route path="profile" element={<Profile />} />
            </Route>

            {/* Página 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>

        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  );
}
