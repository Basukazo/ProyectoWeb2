import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

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

// Context
import { AuthProvider } from "./context/AuthContext.jsx";
import { DataProvider } from "./context/DataContext";

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
          <Navbar />

          <Routes>

            {/* Público */}
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
              {/* Subrutas del dashboard */}
              <Route index element={<TripsList />} />
              <Route path="trips/new" element={<TripForm />} />
              <Route path="trips/:id/edit" element={<TripForm />} />

              <Route path="drivers" element={<DriversList />} />
              <Route path="drivers/new" element={<DriverForm />} />
              <Route path="drivers/:id/edit" element={<DriverForm />} />

              <Route path="profile" element={<Profile />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  );
}
