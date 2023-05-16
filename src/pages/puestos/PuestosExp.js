import React, { useEffect, useState } from "react";
import Axios, { host } from "../../services/Axios";
import { Link, useNavigate } from "react-router-dom";
import Back from "../../layouts/Back";

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
      <Back />
      <div style={{ padding: "2rem" }}>
        <h2>Puestos Locales</h2>
      </div>
      <ul style={{ listStyleType: "none", paddingLeft: 20, paddingRight: 20 }}>
        {puestos.map((el) => (
          <li
            key={el._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
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
              style={{ marginLeft: "1rem" }}
            >
              Revisar
            </button>
          </li>
        ))}
      </ul>
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