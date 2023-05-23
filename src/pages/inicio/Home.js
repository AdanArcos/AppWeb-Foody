import React, { useState, useEffect } from "react";
import Axios from "../../services/Axios";
import logo from "../../assets/LOGO_FOODY.png";
import banner from "../../assets/banner.png";

export function Home() {
  const [personas, setPersonas] = useState([]);

  const consultarPersonas = async () => {
    const consultar = await Axios.get("/personas");
    console.log(consultar.data);
    setPersonas(consultar.data);
  };

  useEffect(() => {
    consultarPersonas();

    if (window.location.pathname === "/") {
      document.body.style.backgroundImage = `linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0)), url(${banner})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundAttachment = "fixed";
    } else {
      document.body.style.backgroundImage = "none";
    }

    return () => {
      document.body.style.backgroundImage = "none";
    };
  }, []);

  return (
    <div>
      <div className="d-flex">
        <img
          src={logo}
          alt="Imagen"
          className="m-auto"
          style={{ width: "auto", height: "700px", padding: "1vw", filter: "brightness(0)" }}
        />
      </div>
      <h2 style={{ color: "white", textAlign: "center", textTransform: "uppercase" }}>CONECTA CON TUS CLIENTES</h2>
    </div>
  );
}
