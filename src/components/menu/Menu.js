import React from "react";
import explorar1 from "../../assets/explorar1.png";
import usuario from "../../assets/usuario.png";
import { Link, useNavigate } from "react-router-dom";

export function Menu() {
  const navigate = useNavigate();
  const login = () => navigate("/Vendedor");
  const exp = () => navigate("/Puestos");
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary p-2 d-flex justify-content-between">
      <div className="d-flex align-items-center" onClick={exp}>
        <img src={explorar1} alt="Imagen" width="60" />
        <h2 className="text-danger">Explorar</h2>
      </div>
      <div>
        <h1>Conecta con tus clientes</h1>
      </div>
      <div>
        <img src={usuario} alt="Imagen" width="60" onClick={login} />
      </div>
    </nav>
  );
}
