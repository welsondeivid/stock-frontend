import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { getProducts } from "./api/productService.js";

import Home from "./pages/Home.jsx";

function App() {
  return (
   useEffect(() => {
      async function fetchData() {
        const products =  await getProducts();
      }
      fetchData();
    }, [])
  );
}

export default App;