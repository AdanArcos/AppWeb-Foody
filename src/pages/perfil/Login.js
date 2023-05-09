import React, { useState } from "react";
import Axios from "../../services/Axios";
import { useNavigate } from "react-router-dom";

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
    <div className="d-flex">
      <form onSubmit={enviar} className="m-auto mt-5 w-25">
        <div>
          <label className="form-label">Nombre</label>
          <input
            className="form-control"
            type="text"
            onChange={handle}
            name="correo"
          />
        </div>
        <div>
          <label className="form-label">Contrasena</label>
          <input
            className="form-control"
            type="password"
            onChange={handle}
            name="password"
          />
        </div>
        <div>
          <button
            type="submit"
            className="btn btn-primary d-block mx-auto mt-2"
          >
            Iniciar sesion
          </button>
        </div>

        {msg && <h2 className="text-danger">{msg}</h2>}
      </form>
    </div>
  );
};
