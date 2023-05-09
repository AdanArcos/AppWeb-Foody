import React, { useState, useEffect } from "react";
import Axios from "../../services/Axios";
import banner from "../../assets/banner.png";
import bebidas from "../../assets/bebidas.png";
import logo from "../../assets/LOGO_FOODY.png";
import fuertes from "../../assets/pfuerte.jpg";
import postres from "../../assets/postres.png";

export function Home() {
  const [personas, setPersonas] = useState([]);
  const consultarPersonas = async () => {
    const consultar = await Axios.get("/personas");
    console.log(consultar.data);
    setPersonas(consultar.data);
  };

  useEffect(() => {
    consultarPersonas();
    document.body.style.backgroundImage = `url(${banner})`;
    document.body.style.backgroundSize = "100%";
    return () => {
      document.body.style.background = `#fff`;
    };
  }, []);

  return (
    <div>
      <div className="d-flex border">
        <img
          src={logo}
          alt="Imagen"
          className="m-auto"
          style={{ width: "auto", height: "400px", padding: "2vw" }}
        />
      </div>
      <div className="row w-100 mx-auto">
        <div className="col-3"></div>
        <img
          src={bebidas}
          alt="Imagen"
          className="col-2"
          style={{ left: 0, bottom: 0 }}
        />
        <img
          src={fuertes}
          alt="Imagen"
          className="col-2"
          style={{ left: "33.33%", bottom: 0 }}
        />
        <img
          src={postres}
          alt="Imagen"
          className="col-2"
          style={{ right: 0, bottom: 0 }}
        />
        <div className="col-3"></div>
      </div>
    </div>
  );
}
