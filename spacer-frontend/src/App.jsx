import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
    </Router>
  );
}

export default App;
