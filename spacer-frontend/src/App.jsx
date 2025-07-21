import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Login from "./auth/Login";
import Register from "./auth/Register";
import BookingPage from "./booking/BookingPage";
import SpaceUnavailable from "./booking/SpaceUnavailable";
import InvoicePage from "./payment/InvoicePage";
import SuccessPage from "./payment/SuccessPage";
import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/book" element={<BookingPage />} />
          <Route path="/space-unavailable" element={<SpaceUnavailable />} />
          <Route path="/invoice" element={<InvoicePage />} />
          <Route path="/success" element={<SuccessPage />} />
        </Route>
      </Routes>
      <div className="flex min-h-screen bg-gray-100 text-gray-900">
        {/* Sidebar (Admin Navigation) */}
        <Sidebar />

        {/* Main Layout Area */}
        <div className="flex flex-col flex-1">
          <Header />

          <main className="flex-1 p-6 overflow-auto">
            <Routes>
              {/* Spaces Routes */}
              <Route path="/admin/spaces" element={<ViewSpaces />} />
              <Route path="/admin/spaces/add" element={<AddSpace />} />
              <Route path="/admin/spaces/edit/:id" element={<AddSpace />} />

              {/* Users Routes */}
              <Route path="/admin/users" element={<ViewUsers />} />
              <Route path="/admin/users/add" element={<AddUser />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
