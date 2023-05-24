import React, { useState } from "react";
import Axios from "../../services/Axios";
import { useNavigate } from "react-router-dom";
import banner from "../../assets/banner.png";

export const Create = () => {
  const [body, setBody] = useState({});
  const [img, setImg] = useState(null);
  const handle = (e) => setBody({ ...body, [e.target.name]: e.target.value });
  const handleImg = (e) => setImg(e.target.files[0]);
  const nav = useNavigate();
  const env = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("avatar", img);
      data.append("datos", JSON.stringify(body));
      const a = await Axios.post("vendedor", data);
      nav("/Login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2 className="p-4"></h2>
      <div
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0)), url(${banner})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          padding: "20px",
          marginLeft: "-20px",
          marginRight: "-20px",
          height: "500px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2 style={{ color: "#FFF", marginBottom: "20px", fontFamily: "WOODCUT" }}>
          REGISTRA TU NEGOCIO
        </h2>
      </div>
      <div className="p-4">
        <h2 className="p-4"></h2>
        <h2
          style={{ fontSize: 30, textAlign: "center", fontFamily: "WOODCUT", color: "#333" }}
        >
          REGISTRATE CON NOSOTROS PARA EMPEZAR A HACER CRECER TU NEGOCIO
        </h2>
      </div>
      <div className="d-flex justify-content-center">
        <form onSubmit={env} className="my-5 p-5 rounded shadow w-50" style={{ backgroundColor: "#F3F1E9" }}>
          <div className="row mb-3">
            <div className="col">
              <label className="form-label">Nombre:</label>
              <input
                type="text"
                name="nombre"
                className="form-control"
                value={body.nombre}
                onChange={handle}
                required
              />
            </div>
            <div className="col">
              <label className="form-label">Apellido paterno:</label>
              <input
                type="text"
                name="apepat"
                className="form-control"
                value={body.apepat}
                onChange={handle}
                required
              />
            </div>
            <div className="col">
              <label className="form-label">Apellido materno:</label>
              <input
                type="text"
                name="apemat"
                className="form-control"
                value={body.apemat}
                onChange={handle}
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label className="form-label">Teléfono:</label>
              <input
                type="text"
                name="telefono"
                className="form-control"
                value={body.telefono}
                onChange={handle}
                required
              />
            </div>
            <div className="col">
              <label className="form-label">Correo:</label>
              <input
                type="text"
                name="correo"
                className="form-control"
                value={body.correo}
                onChange={handle}
                required
                pattern="^(\w|\d)*@(gmail|hotmail|outlook)\.(com|mx|es)$"
              />
            </div>
            <div className="col">
              <label className="form-label">Edad:</label>
              <input
                type="text"
                name="edad"
                className="form-control"
                value={body.edad}
                onChange={handle}
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label className="form-label">Escribe una contraseña:</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={handle}
                required
              />
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-primary"
              style={{
                backgroundColor: "#FFB700",
                borderRadius: "0.3rem",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#FFD700")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#FFB700")}
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
