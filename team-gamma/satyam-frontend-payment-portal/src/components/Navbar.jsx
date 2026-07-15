import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-inner">
        <h2 className="brand">
          Vivid<span>Nexus</span>
        </h2>

        <nav>
          <NavLink to="/">Payment</NavLink>
          <NavLink to="/transactions">Transactions</NavLink>
        </nav>

        <a className="start-btn" href="/">
          Start Now
        </a>
      </div>
    </header>
  );
}

export default Navbar;