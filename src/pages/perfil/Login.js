import React, { useState } from "react";
import Axios from "../../services/Axios";
import { useNavigate } from "react-router-dom";
import banner from "../../assets/banner.png";

export const Login = () => {
  const [cuerpo, setCuerpo] = useState(null);
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  const enviar = async (e) => {
    e.preventDefault();
    try {
      const user = await Axios.post("/VendedorLo", cuerpo);
      localStorage.setItem("session", JSON.stringify(user.data));
      navigate("/Vendedor");
    } catch (err) {
      console.log(err);
      setMsg("Error no existe el usuario");
      setTimeout(() => {
        setMsg(null);
      }, 2000);
    }
  };

  const handle = (e) =>
    setCuerpo({ ...cuerpo, [e.target.name]: e.target.value });

  return (

    <div>
    <div style={{ backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0)), url(${banner})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundAttachment: "fixed", padding: "20px", marginLeft: "-20px", marginRight: "-20px", height: "500px", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <h2 style={{ color: "#FFF", marginBottom: "20px", fontSize: 40, fontFamily: "WOODCUT" }}>INICIO DE SESION</h2>
    </div>
    <div className="p-5">
      <h2 style={{ fontSize: 30, textAlign: "center", fontFamily: "WOODCUT",  }}>INICIA SESION CON TU USUARIO</h2>
    </div>
    <div className="d-flex justify-content-center align-items-center vh-100">
    <form onSubmit={enviar} className="p-5 bg-white rounded shadow">
      <h3 className="text-center mb-4">Iniciar sesión</h3>
      <div className="form-floating mb-3">
        <input
          className="form-control"
          type="text"
          onChange={handle}
          name="correo"
          placeholder=" "
          autoComplete="off"
          required
        />
        <label htmlFor="correo">Usuario o correo electronico</label>
      </div>
      <div className="form-floating mb-4">
        <input
          className="form-control"
          type="password"
          onChange={handle}
          name="password"
          placeholder=" "
          autoComplete="off"
          required
        />
        <label htmlFor="password">Contraseña</label>
      </div>
      {msg && <p className="text-danger mb-3">{msg}</p>}
      <button type="submit" className="btn btn-primary w-100">
        Iniciar sesión
      </button>
    </form>
  </div>
  </div>
  );
};
