import { useState } from "react";
import Axios from "../../services/Axios";
import { useNavigate } from "react-router-dom";

export const PerfilEdit = () => {
  const auth = JSON.parse(localStorage.getItem("session"))[0];
  const [body, setBody] = useState(auth);
  const [img, setImg] = useState(null);
  const handle = (e) => setBody({ ...body, [e.target.name]: e.target.value });
  const handleImg = (e) => setImg(e.target.files[0]);
  console.log(body);
  const nav = useNavigate();
  const env = async (e) => {
    e.preventDefault();
    try {
      const a = await Axios.patch(`/vendedor/${auth._id}`, body);
      localStorage.setItem("session", JSON.stringify([body]));
      nav("/Vendedor");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <form onSubmit={env}>
        <div className="row w-75 mx-auto mt-5">
          <div className="col-4">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              value={body.nombre}
              onChange={handle}
              required
            />
          </div>
          <div className="col-4">
            <label className="form-label">Apellido paterno</label>
            <input
              type="text"
              name="apepat"
              className="form-control"
              value={body.apepat}
              onChange={handle}
              required
            />
          </div>
          <div className="col-4">
            <label className="form-label">Apellido materno</label>
            <input
              type="text"
              name="apemat"
              className="form-control"
              value={body.apemat}
              onChange={handle}
              required
            />
          </div>
          <div className="col-3">
            <label className="form-label">telefono</label>
            <input
              type="text"
              name="telefono"
              className="form-control"
              value={body.telefono}
              onChange={handle}
              required
            />
          </div>
          <div className="col-4">
            <label className="form-label">correo</label>
            <input
              type="text"
              className="form-control"
              value={body.correo}
              onChange={handle}
              disabled
              required
              pattern="^(\w|\d)*@(gmail|hotmail|outlook)\.(com|mx|es)$"
            />
          </div>
          <div className="col-2">
            <label className="form-label">edad</label>
            <input
              type="text"
              name="edad"
              className="form-control"
              value={body.edad}
              onChange={handle}
              required
            />
          </div>
          <div className="col-3">
            <label className="form-label">Actualizar contraseña</label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={handle}
              value={body.password}
              required
            />
          </div>
          <div className="col-12 d-flex justify-content-center align-items-end mt-4">
            <button className="btn btn-warning">Actualizar</button>
          </div>
        </div>
      </form>
    </div>
  );
};
