// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import AddSpace from "./pages/admin/AddSpace";
import ViewSpaces from "./pages/admin/ViewSpaces";
import AddUser from "./pages/admin/AddUser";
import ViewUsers from "./pages/admin/ViewUsers";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/admin/spaces/add" element={<AddSpace />} />
        <Route path="/admin/spaces" element={<ViewSpaces />} />
        <Route path="/admin/users/add" element={<AddUser />} />
        <Route path="/admin/users" element={<ViewUsers />} />
        <Route path="*" element={<h2 className="p-6">Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
