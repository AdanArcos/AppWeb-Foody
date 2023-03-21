import React, { useState, useEffect } from "react";
import Axios from "../../services/Axios";
import banner from "../../assets/banner.png";
import bebidas from "../../assets/bebidas.jpg";
import logo from "../../assets/LOGO_FOODY.png";
import fuertes from "../../assets/pfuerte.jpg";
import postres from "../../assets/postres.jpg";

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
    <div className="">
    <div className="position-relative">
    <img src={banner} alt="Imagen" className="w-25 d-block m-auto"/>
      <img src={logo} alt="Imagen" width="150" className="position-absolute top-0 start-50"/>
    </div >
    <div className="mt-5 d-flex justify-content-around">
    <img src={bebidas} alt="Imagen" className="w-25 rounded"/>
    <img src={fuertes} alt="Imagen" className="w-25 rounded"/>
    <img src={postres} alt="Imagen" className="w-25 rounded"/>
    </div>
    </div>
  );
}
