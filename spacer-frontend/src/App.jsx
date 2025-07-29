// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import DarkModeToggle from "./components/DarkModeToggle";
import Footer from "./components/Footer";

import Home from "./pages/client/Home";
import SpaceDetails from "./pages/client/SpaceDetails";
import Booking from "./pages/client/Booking";
import Login from "./pages/auth/Login";
import AddSpace from "./pages/admin/AddSpace";
import ViewSpaces from "./pages/admin/ViewSpaces";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <Navbar />
        <DarkModeToggle />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/spaces/:id" element={<SpaceDetails />} />
             <Route path="/book/:id" element={<Booking />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/add-space" element={<AddSpace />} />
            <Route path="/admin/view-spaces" element={<ViewSpaces />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
