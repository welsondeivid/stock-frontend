import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Products from "./pages/Products";
import RawMaterial from "./pages/RawMaterial";
import AvailableProductsList from "./pages/Production";

import NavBar from "./components/NavBar";

import "./styles/global.css";

function App() {
  return (
    <BrowserRouter>
    <main>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/raw-materials" element={<RawMaterial />} />
        <Route path="/production" element={<AvailableProductsList />} />
      </Routes>
    </main>

    </BrowserRouter>
  );
}

export default App;
