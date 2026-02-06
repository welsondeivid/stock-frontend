import { NavLink } from "react-router";

function NavBar() {
  return (
    <nav>
      {/* NavLink makes it easy to show active states */}
      <NavLink to="/products" className={({ isActive }) => isActive ? "active" : ""}>
        Produtos
      </NavLink>

      <NavLink to="/raw-materials" className={({ isActive }) => isActive ? "active" : ""}>
        Matérias-Prima
      </NavLink>

      <NavLink to="/production" className={({ isActive }) => isActive ? "active" : ""}>
        Produtos Disponíveis
      </NavLink>
    </nav>
  );
}

export default NavBar;