import React from 'react';
import { useState } from 'react';
import Axios from '../../services/Axios';

export const Registrar = () => {
  const [body, setBody] = useState({
    nombre: "",
    apellidos: "",
    telefono: ""
  });
  const [errors, setErrors] = useState({
    nombre: "",
    apellidos: "",
    telefono: ""
  });

  const errorStyles = {
    color: "red"
  };

  const enviar = async (e) => {
    e.preventDefault();

    // Verificar si hay errores
    if (body.nombre === "" || body.apellidos === "" || body.telefono === "") {
      alert("Por favor, llena todos los campos.");
      return;
    } else if (errors.nombre !== "" || errors.apellidos !== "" || errors.telefono !== "") {
      alert("Por favor, corrige los errores en los campos.");
      return;
    }

    console.log(body);
    let res = await Axios.post("/vendedor", body);
    console.log(res);
    e.target.reset();
  };

  const handle = (e) => {
    setBody({...body, [e.target.name]: e.target.value});

    // Validar el campo de nombre y apellidos
    if (e.target.name === "nombre" || e.target.name === "apellidos") {
      const regex = /^[a-zA-ZñÑ ]*$/;
      const isValid = regex.test(e.target.value);
      const errorMessage = isValid ? "" : "El campo solo debe contener letras y espacios.";

      setErrors({...errors, [e.target.name]: errorMessage});

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
      const errorMessage = isValid ? "" : "El campo de teléfono debe contener 10 números.";

      setErrors({...errors, [e.target.name]: errorMessage});

      const errorElement = e.target.parentNode.querySelector(".error-message");
      if (errorMessage) {
        Object.assign(errorElement.style, errorStyles);
      } else {
        errorElement.style.color = "";
      }
      errorElement.textContent = errorMessage;
    }
  };

  return (
    <div>
      <div>Registrar Vendedor</div>
      <form onSubmit={enviar}>
        <div>
          <label className="label-default">Nombre</label>
          <input type="text" name="nombre" onChange={handle}/>
          <div className="error-message"></div>
        </div>
        <div>
          <label>Apellidos</label>
          <input type="text" name="apellidos" onChange={handle}/>
          <div className="error-message"></div>
        </div>
        <div>
          <label>Telefono</label>
          <input type="text" name="telefono" onChange={handle}/>
          <div className="error-message"></div>
        </div>
        <button>Guardar</button>
      </form>
    </div>
  );
};