import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // Optional

// Client Pages
import Home from "./pages/client/Home";
import SpaceDetails from "./pages/client/SpaceDetails";
import Booking from "./pages/client/Booking";

// Admin Pages
import AddSpace from "./pages/admin/AddSpace";
import ViewSpaces from "./pages/admin/ViewSpaces";


// Auth Page
import Login from "./pages/auth/Login";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Client Module */}
            <Route path="/" element={<Home />} />
            <Route path="/spaces/:id" element={<SpaceDetails />} />
            <Route path="/booking/:id" element={<Booking />} />

            {/* Admin Module */}
            <Route path="/admin/add-space" element={<AddSpace />} />
            <Route path="/admin/view-spaces" element={<ViewSpaces />} />
           
            {/* Auth */}
            <Route path="/login" element={<Login />} />

            {/* 404 Fallback without importing NotFound */}
            <Route
              path="*"
              element={
                <div className="text-center mt-10 text-lg font-semibold text-red-600">
                  404 - Page Not Found
                </div>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
