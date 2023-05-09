import React, { useState } from "react";
import Axios from "../../services/Axios";
import { useNavigate } from "react-router-dom";

export const PuestosForm = () => {
  const auth = localStorage.getItem("session");
  const [body, setBody] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    vendedor: JSON.parse(auth)[0],
  });

  const [img, setImg] = useState(null);

  const [errors, setErrors] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
  });

  const errorStyles = {
    color: "red",
  };

  const navigate = useNavigate();

  const enviar = async (e) => {
    e.preventDefault();

    // Validar si los campos están llenos y no tienen errores
    if (body.nombre === "" || body.direccion === "") {
      alert("Por favor, llena todos los campos.");
      return;
    } else if (
      errors.nombre !== "" ||
      errors.direccion !== "" ||
      errors.telefono !== ""
    ) {
      alert("Por favor, corrige los errores en los campos.");
      return;
    }
    const data = new FormData();
    data.append("datos", JSON.stringify(body));
    Array.from(img).forEach((el) => data.append("imagenes", el));
    console.log(body);
    let res = await Axios.post("/puesto", data)
      .then(() => navigate(`/PuestosXVendedor/${JSON.parse(auth)[0]._id}`))
      .catch((err) => console.log(err));
    console.log(res);
    e.target.reset();
  };

  console.log(auth);

  const handle = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });

    // Validar el campo de nombre
    if (e.target.name === "nombre") {
      const regex = /^[a-zA-ZñÑ ]*$/;
      const isValid = regex.test(e.target.value);
      const errorMessage = isValid
        ? ""
        : "El campo de nombre solo debe contener letras.";

      setErrors({ ...errors, nombre: errorMessage });

      const errorElement = e.target.parentNode.querySelector(".error-message");
      if (errorMessage) {
        Object.assign(errorElement.style, errorStyles);
      } else {
        errorElement.style.color = "";
      }
      errorElement.textContent = errorMessage;
    }

    // Validar el campo de dirección
    if (e.target.name === "direccion") {
      const regex = /^[a-zA-Z0-9\s]*$/;
      const isValid = regex.test(e.target.value);
      const errorMessage = isValid
        ? ""
        : "El campo de dirección solo debe contener letras y números.";

      setErrors({ ...errors, direccion: errorMessage });

      const errorElement = e.target.parentNode.querySelector(".error-message");
      if (errorMessage) {
        Object.assign(errorElement.style, errorStyles);
      } else {
        errorElement.style.color = "";
      }
      errorElement.textContent = errorMessage;
    }

    // Validar el campo de teléfono
    if (e.target.name === "telefono") {
      const regex = /^[0-9]{10}$/;
      const isValid = regex.test(e.target.value);
      const errorMessage = isValid
        ? ""
        : "El campo de teléfono debe contener 10 números.";

      setErrors({ ...errors, telefono: errorMessage });

      const errorElement = e.target.parentNode.querySelector(".error-message");
      if (errorMessage) {
        Object.assign(errorElement.style, errorStyles);
      } else {
        errorElement.style.color = "";
      }
      errorElement.textContent = errorMessage;
    }
  };

  const subirImgs = (e) => {
    setImg(e.target.files);
  };

  return (
    <div>
      <div>
        <h2 className="text-center">Crea un nuevo restaurante o Puesto</h2>
      </div>
      <form onSubmit={enviar} className="row p-4">
        <div className="col-4">
          <label className="form-label">Nombre</label>
          <input
            className="form-control"
            type="text"
            name="nombre"
            onChange={handle}
          />
          <div className="error-message"></div>
        </div>
        <div className="col-4">
          <label className="form-label">Direccion</label>
          <input
            className="form-control"
            type="text"
            name="direccion"
            onChange={handle}
          />
          <div className="error-message"></div>
        </div>
        <div className="col-4">
          <label className="form-label">Imagenes del puesto</label>
          <input
            className="form-control"
            type="file"
            onChange={subirImgs}
            multiple
          />
        </div>
        <div className="col-12 d-flex justify-content-center mt-4">
          <button className="btn btn-primary ">Guardar</button>
        </div>
      </form>
    </div>
  );
};
