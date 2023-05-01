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
  }, []);

  return (
    <div className="position-relative">
      <img src={banner} alt="Imagen" className="w-100"/>
      <img src={logo} alt="Imagen" className="position-absolute top-0 start-0" style={{ width: "40vw", height: "auto", padding: "2vw"}}/>
      <div className="position-absolute bottom-0 w-50 d-flex justify-content-center" style={{ textAlign: "center", left: "50%", transform: "translateX(-50%)" }}>
        <img src={bebidas} alt="Imagen" className="w-25 position-absolute" style={{ left: 0, bottom: 0 }} />
        <img src={fuertes} alt="Imagen" className="w-25 position-absolute" style={{ left: '33.33%', bottom: 0 }} />
        <img src={postres} alt="Imagen" className="w-25 position-absolute" style={{ right: 0, bottom: 0 }} />
      </div>
    </div>
  );
}