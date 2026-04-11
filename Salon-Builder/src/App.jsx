import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SalonOverview from "./Pages/SalonOverview";
import SalonDetails from "./Pages/SalonDetails";
import Sidebar from "./Components/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen">

        {/* SIDEBAR */}
        <Sidebar />

        {/* MAIN CONTENT */}
        <div className="flex-1 bg-[#F6F3EF]">
          <Routes>
            <Route path="/" element={<SalonOverview />} />
            <Route path="/salon/:id" element={<SalonDetails />} />
          </Routes>
        </div>
   <ToastContainer position="top-center" />
      </div>
    </Router>
  );
}