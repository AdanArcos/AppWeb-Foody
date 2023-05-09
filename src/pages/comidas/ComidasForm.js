import React from "react";
import { useState } from "react";
import Axios from "../../services/Axios";
import { useNavigate, useParams } from "react-router-dom";

export const ComidasForm = () => {
  const { idPuesto } = useParams();
  const auth = JSON.parse(localStorage.getItem("session"))[0];
  const puesto = JSON.parse(localStorage.getItem("puesto"));
  const [body, setBody] = useState({ puesto, vendedor: auth, mostrar: true });
  const [img, setImg] = useState([]);
  const navigate = useNavigate();
  const enviar = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Array.from(img).forEach((el) => data.append("imagenes", el));
      data.append("datos", JSON.stringify(body));
      let res = await Axios.post("/comida", data);
      console.log(res);
      e.target.reset();
      navigate("/Puestos/" + idPuesto);
    } catch (err) {
      console.log(err);
    }
  };
  const handle = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  const handleImg = (e) => {
    setImg(e.target.files);
    console.log(e.target.files);
  };

  return (
    <div>
      <div>
        <h2 className="text-center">Registrar Comida</h2>
      </div>
      <form onSubmit={enviar} className="p-4 row">
        <div className="col-4">
          <label className="form-label">Comida</label>
          <input
            type="text"
            name="nombre"
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
            onChange={handle}
            className="form-control"
          />
        </div>
        <div className="col-4">
          <label className="form-label">imagen</label>
          <input
            type="file"
            name="imagenes"
            onChange={handleImg}
            multiple
            className="form-control"
          />
        </div>
        <div className="col-12 d-flex justify-content-center mt-4">
          <button className="btn btn-primary">Guardar</button>
        </div>
      </form>
    </div>
  );
};
