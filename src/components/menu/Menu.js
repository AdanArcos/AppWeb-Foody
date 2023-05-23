import React from "react";
import explorar1 from "../../assets/explorar1.png";
import usuario from "../../assets/usuario.png";
import { Link, useNavigate } from "react-router-dom";

export function Menu() {
  const navigate = useNavigate();
  const login = () => navigate("/Vendedor");
  const exp = () => navigate("/Puestos");
  
  const menuStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#F3F1E9", // Color similar a la barra de navegación de Carne Premium XO
    boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
    zIndex: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    boxSizing: "border-box",
    fontFamily: "Arial, sans-serif", // Fuente de la barra de navegación
  };
  
  const linkContainerStyle = {
    display: "flex",
    gap: "20px",
    marginLeft: "20px",
  };
  
  const linkStyle = {
    color: "#555", // Color de los enlaces
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: "bold",
    letterSpacing: "1px",
  };
  
  const logoStyle = {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    marginLeft: "20px",
  };
  
  const titleStyle = {
    color: "#333",
    fontSize: "24px",
    fontWeight: "bold",
    margin: 0,
    letterSpacing: "1px",
  };
  
  const userStyle = {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    marginRight: "20px",
  };
  
  const userImageStyle = {
    width: "40px",
    borderRadius: "50%",
    overflow: "hidden",
    marginRight: "10px",
  };
  
  return (
    <nav className="navbar" style={menuStyle}>
      <div style={linkContainerStyle}>
        <Link to="/" style={linkStyle}>Inicio</Link>
        <Link to="/create" style={linkStyle}>Registra tu negocio</Link>
        <Link to="/Puestos" style={linkStyle}>Explora</Link>
      </div>
      <div className="user" onClick={login} style={userStyle}>
        <div style={userImageStyle}>
          <img src={usuario} alt="Imagen" width="100%" />
        </div>
      </div>
    </nav>
  );
};
