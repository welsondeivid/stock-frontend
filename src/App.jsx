import { BrowserRouter, Routes, Route } from "react-router-dom";

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
        <Route path="/" element={<AvailableProductsList />} />
        <Route path="/products" element={<Products />} />
        <Route path="/raw-materials" element={<RawMaterial />} />
      </Routes>
    </main>

    </BrowserRouter>
  );
}

export default App;
