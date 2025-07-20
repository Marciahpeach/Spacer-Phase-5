import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";

import AddSpace from "./pages/admin/AddSpace";
import ViewSpaces from "./pages/admin/ViewSpaces";
import AddUser from "./pages/admin/AddUser";
import ViewUsers from "./pages/admin/ViewUsers";

function App() {
  return (
    <Router>
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
