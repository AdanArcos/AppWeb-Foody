import React, { useEffect, useState } from "react";
import Axios, { host } from "../../services/Axios";
import { Link, useNavigate } from "react-router-dom";
import Back from "../../layouts/Back";
import banner from "../../assets/banner.png";

export const PuestosExp = () => {
  const [puestos, setPuestos] = useState([]);

  useEffect(() => {
    consultar();
  }, []);

  const consultar = async () => {
    try {
      const data = await Axios.get("/puestos");
      console.log(data);
      setPuestos(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const auth = localStorage.getItem("session");
  const navigate = useNavigate();

  return (
    <>
      <div style={{ backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0)), url(${banner})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundAttachment: "fixed", padding: "20px", marginLeft: "-20px", marginRight: "-20px", height: "500px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <h2 style={{ color: "#FFF", marginBottom: "20px", fontFamily: "WOODCUT" }}>EXPLORA LOS PUESTOS LOCALES</h2>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
        {puestos.map((el) => (
          <div
            key={el._id}
            style={{
              flexBasis: "30%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "1rem 0",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              {el.imagenes.length > 0 && (
                <img
                  src={`${host}/${el.imagenes[0]}`}
                  style={{
                    width: "250px",
                    height: "250px",
                    objectFit: "cover",
                    marginRight: "1rem",
                  }}
                  alt="..."
                />
              )}
              <div>
                <p style={{ fontWeight: "bold" }}>{el.nombre}</p>
              </div>
            </div>
            <button
              className="btn btn-warning"
              onClick={() => navigate(`/Puestos/${el._id}`)}
              style={{ marginTop: "1rem" }}
            >
              Revisar
            </button>
          </div>
        ))}
      </div>
      {auth && (
        <Link
          to={"/InserPuestos"}
          style={{
            display: "block",
            margin: "2rem 0",
            padding: "0.5rem",
            backgroundColor: "#FFB700",
            color: "white",
            borderRadius: "0.3rem",
            textAlign: "center",
            textDecoration: "none",
          }}
        >
          Añadir puesto
        </Link>
      )}
    </>
  );
};
