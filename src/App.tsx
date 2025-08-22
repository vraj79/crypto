import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Trade from "./pages/Trade";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trade" element={<ProtectedRoute element={<Trade />} />} />
      </Routes>
    </>
  );
}

export default App;
