import React from "react";
import { useState } from "react";
import Axios from "../../services/Axios";
import { useNavigate, useParams } from "react-router-dom";

export const EditComida = () => {
  const { idPuesto } = useParams();
  const auth = JSON.parse(localStorage.getItem("session"))[0];
  const comida = JSON.parse(localStorage.getItem("comidatemp"));
  const [body, setBody] = useState(comida);
  console.log(comida);
  const navigate = useNavigate();
  const enviar = async (e) => {
    e.preventDefault();
    try {
      let res = await Axios.patch(`/comida/${comida._id}`, body);
      console.log(res);
      e.target.reset();
      navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };

  const handle = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  const delComida = async () => {
    const confirm = window.confirm("¿Quieres eliminar este elemento?");

    if (confirm) {
      try {
        await Axios.delete(`/comida/${comida._id}`);
        navigate(-1);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="p-5">
      <h1 className="p-3"></h1>
      <div>
        <h2 className="text-center">Modificar Platillo</h2>
      </div>
      <form onSubmit={enviar} className="p-4 row">
        <div className="col-4">
          <label className="form-label">Comida</label>
          <input
            type="text"
            name="nombre"
            value={body.nombre}
            onChange={handle}
            className="form-control"
          />
        </div>
        <div className="col-4">
          <label className="form-label">Precio</label>
          <input
            type="number"
            name="precio"
            step={0.01}
            value={body.precio}
            onChange={handle}
            className="form-control"
          />
        </div>
        <div className="col-1">
          <label className="form-label p-2">
            <p>Mostrar</p>
            <input
              type="checkbox"
              className="form-check"
              onChange={(e) => setBody({ ...body, mostrar: e.target.checked })}
              checked={body.mostrar}
            />
          </label>
        </div>
        <div className="col-3 d-flex justify-content-center mt-4 gap-2">
          <button className="btn btn-warning">Actualizar comida</button>
          <button className="btn btn-danger" type="button" onClick={delComida}>
            Eliminar comida
          </button>
        </div>
      </form>
    </div>
  );
};
