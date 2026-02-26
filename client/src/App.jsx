import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/common/Header.jsx";
import Layout from "./components/common/Layout";
import UploadPDF from "./pages/UploadPDF.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Summary from "./pages/Summary.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login.jsx";
import Signup from "./pages/SignUp.jsx";


export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>

        <Header />

        <Routes>

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/upload-pdf" element={<UploadPDF />} />
          <Route path="/summary/:summaryId" element={<Summary />} />
        </Routes>

      </AuthProvider>
    </BrowserRouter>
  );
}