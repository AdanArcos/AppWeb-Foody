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

      const image = document.querySelector(".fade-image");
      if (image) {
        image.style.opacity = 0;
        setTimeout(() => {
          image.style.transition = "opacity 1s";
          image.style.opacity = 1;
        }, 100);
      }

      const text = document.querySelector(".slide-text");
      if (text) {
        text.style.transform = "translateX(100%)";
        setTimeout(() => {
          text.style.transition = "transform 1s";
          text.style.transform = "translateX(0)";
        }, 100);
      }
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
          className="m-auto fade-image"
          style={{ width: "auto", height: "400px", padding: "1vw", paddingTop: 100 }}
        />
      </div>
      <h2
        className="slide-text"
        style={{
          color: "white",
          textAlign: "center",
          textTransform: "uppercase",
          fontSize: 50,
          fontFamily: "WOODCUT", 
        }}
      >
        CONECTA CON TUS CLIENTES
      </h2>
    </div>
  );
}
