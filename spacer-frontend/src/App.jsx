import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

// Layout components
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Auth
import Login from "./auth/Login";
import Register from "./auth/Register";
import ProtectedRoute from "./auth/ProtectedRoute";

// Booking and Payment
import BookingPage from "./booking/BookingPage";
import SpaceUnavailable from "./booking/SpaceUnavailable";
import InvoicePage from "./payment/InvoicePage";
import SuccessPage from "./payment/SuccessPage";

// Admin pages (make sure these are imported correctly)
import ViewSpaces from "./admin/ViewSpaces";
import AddSpace from "./admin/AddSpace";
import ViewUsers from "./admin/ViewUsers";
import AddUser from "./admin/AddUser";

// Admin Layout
const AdminLayout = () => (
  <div className="flex min-h-screen bg-gray-100 text-gray-900">
    <Sidebar />
    <div className="flex flex-col flex-1">
      <Header />
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          {/* Booking + Payment Pages (no admin layout) */}
          <Route path="/book" element={<BookingPage />} />
          <Route path="/space-unavailable" element={<SpaceUnavailable />} />
          <Route path="/invoice" element={<InvoicePage />} />
          <Route path="/success" element={<SuccessPage />} />

          {/* Admin Routes with Layout */}
          <Route element={<AdminLayout />}>
            <Route path="/admin/spaces" element={<ViewSpaces />} />
            <Route path="/admin/spaces/add" element={<AddSpace />} />
            <Route path="/admin/spaces/edit/:id" element={<AddSpace />} />

            <Route path="/admin/users" element={<ViewUsers />} />
            <Route path="/admin/users/add" element={<AddUser />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
