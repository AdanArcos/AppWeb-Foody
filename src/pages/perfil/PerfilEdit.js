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
    <div style={{ padding: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form
          onSubmit={env}
          style={{
            marginTop: "5rem",
            padding: "2rem",
            borderRadius: "0.5rem",
            boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.1)",
            width: "50%",
          }}
        >
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ marginBottom: "0.5rem" }}>Nombre:</label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              value={body.nombre}
              onChange={handle}
              required
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ marginBottom: "0.5rem" }}>Apellido paterno:</label>
            <input
              type="text"
              name="apepat"
              className="form-control"
              value={body.apepat}
              onChange={handle}
              required
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ marginBottom: "0.5rem" }}>Apellido materno:</label>
            <input
              type="text"
              name="apemat"
              className="form-control"
              value={body.apemat}
              onChange={handle}
              required
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ marginBottom: "0.5rem" }}>Teléfono:</label>
            <input
              type="text"
              name="telefono"
              className="form-control"
              value={body.telefono}
              onChange={handle}
              required
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ marginBottom: "0.5rem" }}>Correo:</label>
            <input
              type="text"
              name="correo"
              className="form-control"
              value={body.correo}
              onChange={handle}
              required
              pattern="^(\w|\d)*@(gmail|hotmail|outlook)\.(com|mx|es)$"
              style={{ width: "100%" }}
              />
              </div>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ marginBottom: "0.5rem" }}>Edad:</label>
            <input
              type="text"
              name="edad"
              className="form-control"
              value={body.edad}
              onChange={handle}
              required
              style={{ width: "100%" }}
              />
          </div>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ marginBottom: "0.5rem" }}>Actualizar contraseña:</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={body.password}
              onChange={handle}
              required
              style={{ width: "100%" }}
              />
          </div>
              <button
              className="btn btn-primary"
              style={{ width: "100%", marginTop: "1rem" }}
              >
              Actualizar
              </button>
              </form>
              </div>
              </div>
              );
              };
