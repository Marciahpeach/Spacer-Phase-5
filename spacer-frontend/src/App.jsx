import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/client/Home";
import SpaceDetails from "./pages/client/SpaceDetails";
import Booking from "./pages/client/Booking";
import Invoice from "./pages/client/Invoice";

// Admin pages (you'll add these later step by step)
import AddSpace from "./pages/admin/AddSpace";
import ViewSpaces from "./pages/admin/ViewSpaces";
import AddUser from "./pages/admin/AddUser";
import ViewUsers from "./pages/admin/ViewUsers";
import Login from "./pages/auth/Login";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Routes>
          {/* Client Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/spaces/:id" element={<SpaceDetails />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/invoice/:bookingId" element={<Invoice />} />

          {/* Admin Routes (placeholders for now) */}
          <Route path="/admin/add-space" element={<AddSpace />} />
          <Route path="/admin/view-spaces" element={<ViewSpaces />} />
          <Route path="/admin/add-user" element={<AddUser />} />
          <Route path="/admin/view-users" element={<ViewUsers />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
