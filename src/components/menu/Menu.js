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
    backgroundColor: "#f2f2f2",
    boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
    zIndex: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    boxSizing: "border-box",
  };
  
  const logoStyle = {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  };
  
  const imageStyle = {
    width: "40px",
    marginRight: "10px",
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
  };
  
  const userImageStyle = {
    width: "40px",
    borderRadius: "50%",
    overflow: "hidden",
    marginRight: "10px",
  };
  
  return (
    <nav className="navbar" style={menuStyle}>
      <div className="logo" onClick={exp} style={logoStyle}>
        <img src={explorar1} alt="Imagen" style={imageStyle} />
        <h2 style={titleStyle}>Explorar</h2>
      </div>
      <h1 style={{textAlign: "center", fontSize: "32px", fontWeight: "bold", color: "#555", margin: 0, padding: "10px"}}>Conecta con tus clientes</h1>
      <div className="user" onClick={login} style={userStyle}>
        <div style={userImageStyle}>
          <img src={usuario} alt="Imagen" width="100%" />
        </div>
        <h3 style={{margin: 0, color: "#333", fontWeight: "bold"}}>Iniciar Sesión</h3>
      </div>
    </nav>
  );
};