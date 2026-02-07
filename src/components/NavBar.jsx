import { useState } from "react";
import { NavLink } from "react-router";

import Menu from "./Icons/Menu";

import "../styles/navbar.css";

function NavBar() {
  const [open, setOpen] = useState(false);

  function toggleMenu() {
    setOpen(prev => !prev);
  }

  function closeMenu() {
    setOpen(false);
  }

  return (
    <>
      <button className="hamburger" onClick={toggleMenu}>
        <Menu/>
      </button>

      <nav className={open ? "open" : ""}>
        <NavLink to="/products" onClick={closeMenu} className={({ isActive }) => isActive ? "active" : ""}>
          Produtos
        </NavLink>

        <NavLink to="/raw-materials" onClick={closeMenu} className={({ isActive }) => isActive ? "active" : ""}>
          Matérias-Prima
        </NavLink>

        <NavLink to="/production" onClick={closeMenu} className={({ isActive }) => isActive ? "active" : ""}>
          Produtos Disponíveis
        </NavLink>
      </nav>
    </>
  );
}

export default NavBar;