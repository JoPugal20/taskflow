import React from "react";
import { Outlet, Link } from "react-router-dom";

const App = () => {
  return (
    <div>
      <nav style={{ padding: "0.75rem 1rem", background: "#111827", color: "white" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link to="/dashboard" style={{ color: "white", textDecoration: "none", fontWeight: 700 }}>TaskFlow</Link>
          <div>
            <Link to="/login" style={{ color: "#9ca3af", marginRight: "1rem" }}>Login</Link>
            <Link to="/register" style={{ color: "#9ca3af" }}>Register</Link>
          </div>
        </div>
      </nav>
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
