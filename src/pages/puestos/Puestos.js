import React, { useState } from 'react';
import Axios from '../../services/Axios';

export const Puestos = () => {
  const [body, setBody] = useState({
    nombre: "",
    direccion: "",
    telefono: ""
  });

  const [errors, setErrors] = useState({
    nombre: "",
    direccion: "",
    telefono: ""
  });

  const errorStyles = {
    color: "red"
  };

  const enviar = async (e) => {
    e.preventDefault();

    // Validar si los campos están llenos y no tienen errores
    if (body.nombre === "" || body.direccion === "" || body.telefono === "") {
      alert("Por favor, llena todos los campos.");
      return;
    } else if (errors.nombre !== "" || errors.direccion !== "" || errors.telefono !== "") {
      alert("Por favor, corrige los errores en los campos.");
      return;
    }

    console.log(body);
    let res = await Axios.post("/puesto", body);
    console.log(res);
    e.target.reset();
  };

  const handle = (e) => {
    setBody({...body, [e.target.name]: e.target.value});

    // Validar el campo de nombre
    if (e.target.name === "nombre") {
      const regex = /^[a-zA-ZñÑ ]*$/;
      const isValid = regex.test(e.target.value);
      const errorMessage = isValid ? "" : "El campo de nombre solo debe contener letras.";

      setErrors({...errors, nombre: errorMessage});

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
      const errorMessage = isValid ? "" : "El campo de dirección solo debe contener letras y números.";

      setErrors({...errors, direccion: errorMessage});

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

      setErrors({...errors, telefono: errorMessage});

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
    <div style={{backgroundColor: "#F5F5F5", padding: "20px", borderRadius: "10px"}}>
      <h2 style={{color: "#333", marginBottom: "20px"}}>Puesto</h2>
      <form onSubmit={enviar}>
        <div style={{display: "flex", flexDirection: "column", marginBottom: "20px"}}>
          <label style={{marginBottom: "5px", fontWeight: "bold"}}>Nombre:</label>
          <input type="text" name="nombre" onChange={handle} style={{padding: "5px", borderRadius: "5px", border: "1px solid #CCC", width: "100%"}} />
          <div className="error-message" style={{color: "red", marginTop: "5px"}}></div>
        </div>
        <div style={{display: "flex", flexDirection: "column", marginBottom: "20px"}}>
          <label style={{marginBottom: "5px", fontWeight: "bold"}}>Direccion:</label>
          <input type="text" name="direccion" onChange={handle} style={{padding: "5px", borderRadius: "5px", border: "1px solid #CCC", width: "100%"}} />
          <div className="error-message" style={{color: "red", marginTop: "5px"}}></div>
        </div>
        <div style={{display: "flex", flexDirection: "column", marginBottom: "20px"}}>
          <label style={{marginBottom: "5px", fontWeight: "bold"}}>Telefono:</label>
          <input type="text" name="telefono" onChange={handle} style={{padding: "5px", borderRadius: "5px", border: "1px solid #CCC", width: "100%"}} />
          <div className="error-message" style={{color: "red", marginTop: "5px"}}></div>
        </div>
        <button style={{backgroundColor: "#4CAF50", color: "white", padding: "10px 20px", border: "none", borderRadius: "3px", cursor: "pointer"}}>Guardar</button>
      </form>
    </div>
  );
}